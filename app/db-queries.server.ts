import { jsonSafeParse } from "./components/_helpers";
import { EditRedirectItem, RedirectItem } from "./components/_types";
import prisma from "./db.server";

interface DBResponse {
  status: boolean;
  data?: any;
  error?: string;
}

interface Shop {
  shop: string;
}

interface InitialConfigs extends Shop {
  basicConfigs: any;
  advancedConfigs?: any;
}

interface MarketsConfigs extends Shop {
  basicConfigs: any;
  advancedConfigs?: any;
}

interface AllRedirects extends Shop {
  localesAllowed?: boolean;
}

interface DeleteRedirect extends Shop {
  id: number;
}

interface ReorderRedirects extends Shop {
  ids: number[]
}

interface AllowedPagesProps extends Shop {
  allowedPages: any;
  hideOnAllowedPages?: boolean;
}

interface MarketSyncStatus extends Shop {
  syncStatus: string;
}

interface MarketsData extends Shop {
  markets: any;
}

// App Plans
// Free  - 3
// Basic - 1
// Pro - 2
const FREE_PLAN_LIMIT = 1;
const BASIC_PLAN_LIMIT = 4;

export async function addActiveShop({ shop }: Shop): Promise<DBResponse> {
  try {
    if (!shop) throw new Error("shop undefined");
    const result = await prisma.activeShops.upsert({
      where: { shop },
      update: { status: 1 },
      create: { shop, status: 1 },
      select: { createdDate: true },
    });
    return { status: result?.createdDate ? true : false, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
}

export const createInitialConfigs = async ({
  shop,
  basicConfigs,
  advancedConfigs = null,
}: InitialConfigs): Promise<DBResponse> => {
  try {
    // First, fetch the shop's id from the activeShops table
    const activeShop = await prisma.activeShops.findUnique({
      where: { shop },
      select: { id: true },
    });

    if (!activeShop) {
      throw new Error("Shop not found");
    }

    const result = await prisma.configs.upsert({
      where: { shopId: activeShop.id }, // shopId should be unique in the configs table
      update: {}, // No update action is required, we just want to ignore conflicts
      create: {
        shopId: activeShop.id,
        basicConfigs: basicConfigs,
        advancedConfigs: advancedConfigs,
      },
    });

    return { status: result?.id ? true : false, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export async function getShopdb({ shop }: Shop): Promise<DBResponse> {
  try {
    if (!shop) throw new Error("shop undefined");
    const result = await prisma.activeShops.findFirst({
      where: {
        shop,
      },
      select: {
        id: true,
        shop: true,
        plan: true,
        shopifyPlanId: true,
        dev: true,
        veteran: true,
      },
    });
    return { status: result?.id ? true : false, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
}

export async function disableShop({ shop }: Shop): Promise<DBResponse> {
  try {
    if (!shop) throw new Error("shop undefined");
    const result = await prisma.activeShops.update({
      where: {
        shop,
      },
      data: {
        status: 0,
      },
    });
    return { status: result?.id > 0, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
}
export async function removeShop({ shop }: Shop): Promise<DBResponse> {
  try {
    if (!shop) throw new Error("shop undefined");
    const result = await prisma.activeShops.delete({
      where: {
        shop,
      },
    });
    return { status: result?.id ? true : false, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
}

export async function getAnalyticsData({ shop }: Shop): Promise<DBResponse> {
  try {
    const analyticsData = await prisma.analytics.findMany({
      where: {
        shop: shop, // Match the shop field
      },
    });

    return { status: analyticsData?.length > 0, data: analyticsData || [] };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
}

export async function createRedirect({
  shopId,
  flag,
  label,
  url,
  order = 1,
  conditional = false,
  conditionalLocation,
  domainRedirection = false,
  locales = {},
}: RedirectItem): Promise<DBResponse> {
  try {
    const stringifyLocales = locales && typeof locales === 'object' ? JSON.stringify(locales) : null;
    const stringifyConditionalLocation = conditionalLocation
      ? JSON.stringify(conditionalLocation)
      : null;

    const activeShop = await prisma.activeShops.findUnique({
      where: { id: shopId },
      select: { plan: true },
    });

    if (!activeShop) {
      throw new Error('Shop not found');
    }

    const redirectCount = await prisma.redirects.count({
      where: { shopId },
    });

    const plan = activeShop.plan;

    let redirectLimit = FREE_PLAN_LIMIT; // Default redirect limit
    if (plan === 2) {
      redirectLimit = 999;
    } else if (plan === 1) {
      redirectLimit = BASIC_PLAN_LIMIT;
    }

    if (redirectCount >= redirectLimit) {
      throw new Error("Plan limit");
    }

    const dbResponse = await prisma.redirects.create({
      data: {
        shopId,
        flag,
        label,
        url,
        order,
        conditional,
        conditionalLocation: stringifyConditionalLocation,
        domainRedirection,
        locales: stringifyLocales,
      },
      select: { id: true },
    });

    return { status: true, data: dbResponse };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
}

export const getAllRedirects = async ({ shop, localesAllowed }: AllRedirects): Promise<DBResponse> => {
  try {
    const selectFields = {
      id: true,
      flag: true,
      label: true,
      url: true,
      order: true,
      conditional: true,
      conditionalLocation: true,
      domainRedirection: true,
      status: true,
      locales: true,
    };
    // TODO: Add localesAllowed to the select fields
    // if (localesAllowed) {
    //   selectFields['locales'] = true;
    // }

    const redirects = await prisma.redirects.findMany({
      where: {
        activeShop: {
          shop,
        },
      },
      select: selectFields,
    });

    const parsedRedirects = redirects.map((redirect) => ({
      ...redirect,
      locales: redirect.locales ? jsonSafeParse(redirect.locales) : null,
      conditionalLocation: redirect.conditionalLocation
        ? jsonSafeParse(redirect.conditionalLocation)
        : null,
    }));

    return { status: parsedRedirects.length > 0, data: parsedRedirects };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const updateRedirect = async ({
  id,
  flag,
  label,
  url,
  locales,
  conditional = false,
  conditionalLocation,
  domainRedirection = false,
  status = true,
}: EditRedirectItem): Promise<DBResponse> => {
  try {
    const result = await prisma.redirects.update({
      where: { id },
      data: {
        flag,
        label,
        url,
        status,
        locales: locales ? JSON.stringify(locales) : null,
        conditional,
        conditionalLocation: conditionalLocation ? JSON.stringify(conditionalLocation) : null,
        domainRedirection: domainRedirection,
      },
      select: { id: true },
    });

    return { status: result?.id ? true : false, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const updateRedirectStatus = async ({
  id,
  status = true,
}: EditRedirectItem): Promise<DBResponse> => {
  try {
    const result = await prisma.redirects.update({
      where: { id },
      data: {
        status,
      },
      select: { id: true },
    });

    return { status: result?.id ? true : false, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const deleteRedirect = async ({ id, shop }: DeleteRedirect): Promise<DBResponse> => {
  try {
    if (!id) throw new Error("id undefined");
    const activeShop = await prisma.activeShops.findUnique({
      where: { shop },
      select: { id: true },
    });

    if (!activeShop) {
      throw new Error("Shop not found");
    }

    const result = await prisma.redirects.deleteMany({
      where: {
        id,
        shopId: activeShop.id,
      },
    });

    return { status: result.count > 0, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const reorderRedirect = async ({ ids, shop }: ReorderRedirects): Promise<DBResponse> => {
  try {
    const updatePromises = ids.map((id, index) =>
      prisma.redirects.update({
        where: { id, activeShop: { shop } },
        data: { order: index + 1 },
      })
    );

    const results = await Promise.all(updatePromises);

    return { status: results.length > 0, data: results };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};


export const getConfigs = async ({ shop }: Shop): Promise<DBResponse> => {
  try {
    const configs = await prisma.configs.findMany({
      where: {
        activeShop: {
          shop,
        },
      },
      select: {
        shopId: true,
        basicConfigs: true,
        advancedConfigs: true,
        allowedPages: true,
        hideOnAllowedPages: true,
        status: true,
        activeShop: {
          select: {
            shop: true,
          },
        },
      },
    });

    const formattedConfigs = configs.map(config => ({
      ...config,
      basicConfigs: jsonSafeParse(config?.basicConfigs),
      advancedConfigs: jsonSafeParse(config?.advancedConfigs),
      allowedPages: jsonSafeParse(config.allowedPages),
    }));

    return { status: formattedConfigs.length > 0, data: formattedConfigs };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const createUpdateConfigs = async ({
  shop,
  basicConfigs,
  advancedConfigs = null,
}: InitialConfigs): Promise<DBResponse> => {
  try {
    const activeShop = await prisma.activeShops.findUnique({
      where: { shop },
      select: { id: true },
    });

    if (!activeShop) {
      throw new Error("Shop not found");
    }
    const basicConfigsString = basicConfigs ? JSON.stringify(basicConfigs) : null
    const advancedConfigsString = advancedConfigs ? JSON.stringify(advancedConfigs) : null

    const result = await prisma.configs.upsert({
      where: { shopId: activeShop.id },
      update: {
        basicConfigs: basicConfigsString,
        advancedConfigs: advancedConfigsString,
      },
      create: {
        shopId: activeShop.id,
        basicConfigs: basicConfigsString,
        advancedConfigs: advancedConfigsString,
      },
    });

    return { status: result ? true : false, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const createUpdateAllowedPages = async ({
  shop,
  allowedPages,
  hideOnAllowedPages = false,
}: AllowedPagesProps): Promise<DBResponse> => {
  try {
    const activeShop = await prisma.activeShops.findUnique({
      where: { shop },
      select: { id: true },
    });

    if (!activeShop) {
      throw new Error("Shop not found");
    }

    const allowedPagesString = allowedPages ? JSON.stringify(allowedPages) : null;

    const result = await prisma.configs.upsert({
      where: { shopId: activeShop.id },
      update: {
        allowedPages: allowedPagesString,
        hideOnAllowedPages,
      },
      create: {
        shopId: activeShop.id,
        allowedPages: allowedPagesString,
        hideOnAllowedPages,
      },
    });

    return { status: result ? true : false, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const createUpdateMarketConfigs = async ({
  shop,
  basicConfigs,
  advancedConfigs = null,
}: MarketsConfigs): Promise<DBResponse> => {
  try {
    const activeShop = await prisma.activeShops.findUnique({
      where: { shop },
      select: { id: true },
    });

    if (!activeShop) {
      throw new Error("Shop not found");
    }
    const basicConfigsString = basicConfigs ? JSON.stringify(basicConfigs) : null
    const advancedConfigsString = advancedConfigs ? JSON.stringify(advancedConfigs) : null

    const result = await prisma.marketsConfigs.upsert({
      where: { shopId: activeShop.id },
      update: {
        basicConfigs: basicConfigsString,
        advancedConfigs: advancedConfigsString,
      },
      create: {
        shopId: activeShop.id,
        basicConfigs: basicConfigsString,
        advancedConfigs: advancedConfigsString,
      },
    });

    return { status: result ? true : false, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const getMarketSyncStatus = async ({ shop }: Shop): Promise<DBResponse> => {
  try {
    const activeShop = await prisma.activeShops.findUnique({
      where: { shop },
      select: { id: true },
    });

    if (!activeShop) {
      throw new Error("Shop not found");
    }
    const result = await prisma.markets.findFirst({
      where: { shopId: activeShop.id },
      select: { syncStatus: true }
    });
    // console.log('getMarketSyncStatus', result);
    return { status: result ? true : false, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const getMarketsData = async ({ shop }: Shop): Promise<DBResponse> => {
  try {
    const activeShop = await prisma.activeShops.findUnique({
      where: { shop },
      select: { id: true },
    });

    if (!activeShop) {
      throw new Error("Shop not found");
    }
    const result = await prisma.markets.findFirst({
      where: { shopId: activeShop.id },
      select: { markets: true, syncStatus: true, lastSyncTimestamp: true }
    });
    return { status: result ? true : false, data: result };
  } catch (error) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const getMarketConfigs = async ({ shop }: Shop): Promise<DBResponse> => {
  try {
    const activeShop = await prisma.activeShops.findUnique({
      where: { shop },
      select: { id: true },
    });

    if (!activeShop) {
      throw new Error("Shop not found");
    }
    const result = await prisma.marketsConfigs.findFirst({
      where: { shopId: activeShop.id },
      select: { basicConfigs: true, advancedConfigs: true, widget: true, autoRedirect: true }
    });
    return { status: result ? true : false, data: result };
  } catch (error) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const updateMarketSyncStatus = async ({ shop, syncStatus }: MarketSyncStatus): Promise<DBResponse> => {
  try {
    const activeShop = await prisma.activeShops.findUnique({
      where: { shop },
      select: { id: true },
    });

    if (!activeShop) {
      throw new Error("Shop not found");
    }
    const result = await prisma.markets.upsert({
      where: { shopId: activeShop.id },
      update: { syncStatus },
      create: { shopId: activeShop.id, syncStatus }
    });
    return { status: result ? true : false, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const addMarketsData = async ({ shop, markets }: MarketsData): Promise<DBResponse> => {
  try {
    const activeShop = await prisma.activeShops.findUnique({
      where: { shop },
      select: { id: true },
    });

    if (!activeShop) {
      throw new Error("Shop not found");
    }
    const timestamp = new Date().toISOString();
    const result = await prisma.markets.upsert({
      where: { shopId: activeShop.id },
      update: { markets: JSON.stringify(markets), syncStatus: "SUCCESS", lastSyncTimestamp: timestamp },
      create: { shopId: activeShop.id, markets: JSON.stringify(markets), syncStatus: "SUCCESS", lastSyncTimestamp: timestamp }
    });

    return { status: result ? true : false, data: result };
  } catch (error) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const updateMarketsWidget = async ({ shop, widget }: { shop: string, widget: boolean }): Promise<DBResponse> => {
  try {
    const activeShop = await prisma.activeShops.findUnique({
      where: { shop },
      select: { id: true },
    });

    if (!activeShop) {
      throw new Error("Shop not found");
    }
    const result = await prisma.marketsConfigs.update({
      where: { shopId: activeShop.id },
      data: { widget },
    });
    return { status: result ? true : false, data: result };
  } catch (error) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};

export const updateMarketsRedirect = async ({ shop, autoRedirect }: { shop: string, autoRedirect: boolean }): Promise<DBResponse> => {
  try {
    const activeShop = await prisma.activeShops.findUnique({
      where: { shop },
      select: { id: true },
    });

    if (!activeShop) {
      throw new Error("Shop not found");
    }
    const result = await prisma.marketsConfigs.update({
      where: { shopId: activeShop.id },
      data: { autoRedirect },
    });
    return { status: result ? true : false, data: result };
  } catch (error) {
    console.error(error);
    return { status: false, error: (error as Error).toString() };
  }
};



// export const runMarketsSync = async ({ shop }: Shop): Promise<DBResponse> => {
//   try {
//     const result = await prisma.activeShops.update({
//       where: { shop },
//       data: {
//         marketsSync: true,
//       },
//     });

//     return { status: result ? true : false, data: result };
//   } catch (error: any) {
//     console.error(error);
//     return { status: false, error: (error as Error).toString() };
//   }
// };
//   shop_id,
//   flag,
//   label,
//   url,
//   order_r = 1,
//   conditional = false,
//   conditional_location,
//   domain_redirection = false,
//   locales = null,
// }) {
//   try {
//     const redirectLocales = locales ? JSON.stringify(locales) : null;
//     const conditionalLocation = conditional_location
//       ? JSON.stringify(conditional_location)
//       : null;
//     const planQuery = "SELECT plan FROM active_shops WHERE id = $1";
//     const redirectCountQuery =
//       "SELECT COUNT(*) FROM redirects WHERE shop_id = $1";
//     const planResult = await pool.query(planQuery, [shop_id]);
//     const redirectCountResult = await pool.query(redirectCountQuery, [shop_id]);
//     const plan = planResult.rows[0].plan;
//     const redirectCount = parseInt(redirectCountResult.rows[0].count, 10);

//     let redirectLimit = FREE_PLAN_LIMIT; // Default redirect limit
//     if (plan === 2) {
//       redirectLimit = 999;
//     } else if (plan === 1) {
//       redirectLimit = BASIC_PLAN_LIMIT;
//     }

//     if (redirectCount >= redirectLimit) {
//       return 0; // Return early if redirect limit is reached
//     }

//     const insertQuery = `
//     INSERT INTO redirects (shop_id, flag, label, url, order_r, conditional, conditional_location, domain_redirection, locales)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);;
//     `;
//     const insertParams = [
//       shop_id,
//       flag,
//       label,
//       url,
//       order_r,
//       conditional,
//       conditionalLocation,
//       domain_redirection,
//       redirectLocales,
//     ];
//     const dbResponse = await pool.query(insertQuery, insertParams);

//     const { rowCount } = dbResponse;

//     return rowCount;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };
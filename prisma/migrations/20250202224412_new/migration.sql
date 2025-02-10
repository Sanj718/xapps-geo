-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" TIMESTAMP(3),
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "accountOwner" BOOLEAN NOT NULL DEFAULT false,
    "locale" TEXT,
    "collaborator" BOOLEAN DEFAULT false,
    "emailVerified" BOOLEAN DEFAULT false,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "active_shops" (
    "id" SERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shop" TEXT NOT NULL,
    "status" INTEGER,
    "plan" INTEGER NOT NULL DEFAULT 3,
    "dev" BOOLEAN NOT NULL DEFAULT false,
    "shopify_plan_id" TEXT,
    "email" TEXT,
    "veteran" BOOLEAN NOT NULL DEFAULT false,
    "trial_created_at" TEXT,

    CONSTRAINT "active_shops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configs" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shop_id" INTEGER NOT NULL,
    "basic_configs" TEXT,
    "status" BOOLEAN DEFAULT true,
    "advanced_configs" TEXT,
    "allowed_pages" TEXT,
    "hide_on_allowed_pages" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "markets" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shop_id" INTEGER NOT NULL,
    "markets" TEXT,
    "sync_status" TEXT,
    "last_sync_timestamp" TIMESTAMP(3),

    CONSTRAINT "markets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "markets_configs" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shop_id" INTEGER NOT NULL,
    "widget" BOOLEAN NOT NULL DEFAULT false,
    "auto_redirect" BOOLEAN NOT NULL DEFAULT false,
    "basic_configs" TEXT,
    "advanced_configs" TEXT,

    CONSTRAINT "markets_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "redirects" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shop_id" INTEGER NOT NULL,
    "flag" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "locales" TEXT,
    "order_r" INTEGER NOT NULL DEFAULT 0,
    "conditional" BOOLEAN NOT NULL DEFAULT false,
    "conditional_location" TEXT,
    "domain_redirection" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "redirects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shop" TEXT NOT NULL,
    "data_button" TEXT DEFAULT '0',
    "data_auto" TEXT DEFAULT '0',
    "data_markets_button" TEXT DEFAULT '0',
    "data_markets_auto" TEXT DEFAULT '0',

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "active_shops_shop_key" ON "active_shops"("shop");

-- CreateIndex
CREATE UNIQUE INDEX "configs_shop_id_key" ON "configs"("shop_id");

-- CreateIndex
CREATE UNIQUE INDEX "markets_shop_id_key" ON "markets"("shop_id");

-- CreateIndex
CREATE UNIQUE INDEX "markets_configs_shop_id_key" ON "markets_configs"("shop_id");

-- CreateIndex
CREATE UNIQUE INDEX "analytics_shop_key" ON "analytics"("shop");

-- AddForeignKey
ALTER TABLE "configs" ADD CONSTRAINT "configs_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "active_shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "markets" ADD CONSTRAINT "markets_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "active_shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "markets_configs" ADD CONSTRAINT "markets_configs_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "active_shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "redirects" ADD CONSTRAINT "redirects_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "active_shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

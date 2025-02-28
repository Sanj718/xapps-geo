import {
  Thumbnail,
  Button,
  Pagination,
  Box,
  ResourceList,
  ResourceItem,
  InlineGrid,
  InlineStack,
} from "@shopify/polaris";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  RefreshIcon,
} from "@shopify/polaris-icons";
import { useState, useMemo, useEffect } from "react";
import { getPureId, loadingStates, requestHeaders } from "../_helpers";
import {
  useFetcher,
  useNavigate,
} from "@remix-run/react";
import { LoadingStates } from "../_types";
import { ACTIONS } from "../_actions";


interface PaginationInfo {
  endCursor?: string;
  startCursor?: string;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

interface FileItem {
  node: {
    id: string;
    alt: string;
    image: {
      originalSrc: string;
    };
    originalSource: string;
  };
}

interface FetcherData {
  _action: string;
  status: boolean;
  data: {
    edges: FileItem[];
    pageInfo: PaginationInfo;
  };
}

interface HandleAddItem {
  id: string;
  url: string;
}

interface ImageManagerProps {
  selectedData?: HandleAddItem[];
  callBack: (item: HandleAddItem) => void;
}

export default function ImageManager({
  selectedData = [],
  callBack,
}: ImageManagerProps) {
  const fetcher = useFetcher<FetcherData>();
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);
  const [files, setFiles] = useState<FileItem[] | undefined>(undefined);


  async function loadAssets(cursor?: string, isPrev: boolean = false): Promise<void> {
    fetcher.submit(
      {
        _action: ACTIONS.AssetsData,
        data: { cursor: cursor || null, isPrev },
      },
      requestHeaders,
    );
  }

  useEffect(() => {
    loadAssets();
  }, []);

  useMemo(() => {
    const { data: fetcherData } = fetcher;
    if (fetcherData?._action === ACTIONS.AssetsData && fetcherData?.status) {
      setFiles(fetcherData?.data?.edges);
      setPaginationInfo(fetcherData?.data?.pageInfo);
    }
  }, [fetcher?.data]);

  const handlePaginationNext = async () => {
    loadAssets(paginationInfo?.endCursor);
  };

  const handlePaginationPrev = async () => {
    loadAssets(paginationInfo?.startCursor, true);
  };

  const handleRefresh = () => {
    loadAssets();
  };

  const handleAdd = (item: HandleAddItem): void => {
    callBack(item);
  };

  const resourceName = {
    singular: "asset",
    plural: "assets",
  };

  const { assetsDataLoading } = loadingStates(fetcher, [ACTIONS.AssetsData]) as LoadingStates;
  console.log("assetsDataLoading", files);
  return (
    <Box padding="400">
      <InlineGrid gap="200" alignItems="center">
        <InlineStack align="space-between" gap="100">
          <Button icon={RefreshIcon} onClick={handleRefresh}>
            Refresh list
          </Button>
          {(paginationInfo?.hasPreviousPage || paginationInfo?.hasNextPage) && (
            <InlineStack align="center">
              <Pagination
                hasPrevious={paginationInfo?.hasPreviousPage}
                onPrevious={handlePaginationPrev}
                hasNext={paginationInfo?.hasNextPage}
                onNext={handlePaginationNext}
              />
            </InlineStack>
          )}
          <Button url="shopify://admin/content/files">Upload more</Button>
        </InlineStack>
        <div
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: "5px",
            maxHeight: "200px",
            overflow: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <ResourceList
            loading={assetsDataLoading}
            resourceName={resourceName}
            items={files || []}
            renderItem={renderItem}
          />
        </div>
      </InlineGrid>
    </Box>
  );

  function renderItem(item: FileItem) {
    const { id, alt, image, originalSource } = item.node;
    const pureId = getPureId(id);
    const media = (
      <Thumbnail size="extraSmall" alt={alt} source={image?.originalSrc} />
    );

    const imageExist = selectedData?.find((item: HandleAddItem) => item.id === id);

    return (
      <ResourceItem
        id={pureId || ""}
        media={media}
        accessibilityLabel={`View details`}
        verticalAlignment="center"
        onClick={() => { }}
      >
        <InlineStack align="end">
          <Button
            icon={imageExist ? MinusCircleIcon : PlusCircleIcon}
            disabled={imageExist}
            size="micro"
            onClick={() => {
              handleAdd({
                id,
                url: image?.originalSrc,
              });
            }}
          >
            {imageExist ? "Selected" : "Select"}
          </Button>
        </InlineStack>
      </ResourceItem>
    );
  }
}

import { FormattedMessage } from "react-intl";

import { ConnectionSyncButtons } from "components/connection/ConnectionSync/ConnectionSyncButtons";
import { Card } from "components/ui/Card";
import { FlexContainer } from "components/ui/Flex";

import { useConnectionEditService } from "hooks/services/ConnectionEdit/ConnectionEditService";

import { ConnectionStatusOverview } from "./ConnectionStatusOverview";
import { ErrorMessage } from "./ErrorMessage";

export const ConnectionStatusCard: React.FC = () => {
  const { connection } = useConnectionEditService();
  const {
    syncCatalog: { streams },
  } = connection;
  const streamCount = streams.reduce((count, stream) => count + (stream.config?.selected ? 1 : 0), 0);

  return (
    <Card
      title={
        <FlexContainer justifyContent="space-between" alignItems="center">
          <ConnectionStatusOverview />
          <ConnectionSyncButtons buttonText={<FormattedMessage id="connection.startSync" values={{ streamCount }} />} />
        </FlexContainer>
      }
    >
      <ErrorMessage />
    </Card>
  );
};

import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

import { HeadTitle } from "components/common/HeadTitle";
import { PageContainer } from "components/PageContainer";
import { SelectConnector } from "components/source/SelectConnector";
import { Box } from "components/ui/Box";
import { Heading } from "components/ui/Heading";

import { useAvailableDestinationDefinitions } from "hooks/domain/connector/useAvailableDestinationDefinitions";

export const SelectDestinationPage: React.FC = () => {
  const navigate = useNavigate();
  const destinationDefinitions = useAvailableDestinationDefinitions();

  return (
    <>
      <HeadTitle titles={[{ id: "destinations.newDestinationTitle" }]} />
      <Box px="md" pt="2xl" pb="md">
        <PageContainer centered>
          <Heading as="h2" size="lg">
            <FormattedMessage id="destinations.selectDestinationTitle" />
          </Heading>
        </PageContainer>
      </Box>
      <Box pb="2xl">
        <SelectConnector
          connectorType="destination"
          connectorDefinitions={destinationDefinitions}
          onSelectConnectorDefinition={(id) => navigate(`./${id}`)}
        />
      </Box>
    </>
  );
};

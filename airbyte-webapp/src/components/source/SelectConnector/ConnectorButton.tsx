import { ConnectorIcon } from "components/common/ConnectorIcon";
import { BuilderPrompt } from "components/connectorBuilder/BuilderPrompt";
import { ReleaseStageBadge } from "components/ReleaseStageBadge";
import { Text } from "components/ui/Text";

import { ConnectorDefinition } from "core/domain/connector";
import { RoutePaths } from "pages/routePaths";

import styles from "./ConnectorButton.module.scss";

interface ConnectorButtonProps<T extends ConnectorDefinition> {
  onClick: (definition: T) => void;
  definition: T;
}

export const ConnectorButton = <T extends ConnectorDefinition>({ definition, onClick }: ConnectorButtonProps<T>) => {
  return (
    <button className={styles.button} onClick={() => onClick(definition)}>
      <ConnectorIcon icon={definition.icon} className={styles.icon} />

      <Text size="lg" as="span" className={styles.text}>
        {definition.name}
      </Text>

      <span className={styles.releaseStage}>
        <ReleaseStageBadge stage={definition.releaseStage} />
      </span>
    </button>
  );
};

export const BuilderConnectorButton: React.FC = () => {
  return (
    <BuilderPrompt
      className={styles.button}
      shortDescription
      renderAsButton
      builderRoutePath={`../../${RoutePaths.ConnectorBuilder}`}
    />
  );
};

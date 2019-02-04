import { commitLocalUpdate, Environment } from "relay-runtime";

import { TalkContext } from "talk-framework/lib/bootstrap";
import { createMutationContainer } from "talk-framework/lib/relay";
import { LOCAL_ID } from "talk-framework/lib/relay/withLocalStateContainer";

export interface SetAuthViewInput {
  // TODO: replace with generated typescript types.
  view: "SIGN_IN" | "ADD_EMAIL_ADDRESS" | "CREATE_USERNAME" | "CREATE_PASSWORD";
}

export type SetAuthViewMutation = (input: SetAuthViewInput) => Promise<void>;

export async function commit(
  environment: Environment,
  input: SetAuthViewInput,
  { pym }: TalkContext
) {
  return commitLocalUpdate(environment, store => {
    const record = store.get(LOCAL_ID)!;
    record.setValue(input.view, "authView");
  });
}

export const withSetAuthViewMutation = createMutationContainer(
  "setAuthView",
  commit
);

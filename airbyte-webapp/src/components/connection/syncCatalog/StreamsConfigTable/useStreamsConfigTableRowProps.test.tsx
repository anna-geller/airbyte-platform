import { renderHook } from "@testing-library/react-hooks";
import * as formik from "formik";

import { FormikConnectionFormValues } from "components/connection/ConnectionForm/formConfig";

import { AirbyteStreamAndConfiguration } from "core/request/AirbyteClient";
import * as connectionFormService from "hooks/services/ConnectionForm/ConnectionFormService";

import { useStreamsConfigTableRowProps } from "./useStreamsConfigTableRowProps";

const mockStream: Partial<AirbyteStreamAndConfiguration> = {
  stream: {
    name: "stream_name",
    namespace: "stream_namespace",
  },
  config: { selected: true, syncMode: "full_refresh", destinationSyncMode: "overwrite" },
};

const mockInitialValues: Partial<FormikConnectionFormValues> = {
  syncCatalog: {
    streams: [
      {
        stream: {
          name: "stream_name",
          namespace: "stream_namespace",
        },
        config: { selected: true, syncMode: "full_refresh", destinationSyncMode: "overwrite" },
      },
    ],
  },
};

const mockDisabledInitialValues: Partial<FormikConnectionFormValues> = {
  syncCatalog: {
    streams: [
      {
        ...mockInitialValues.syncCatalog?.streams[0],
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        config: { ...mockInitialValues.syncCatalog!.streams[0].config!, selected: false },
      },
    ],
  },
};

const testSetup = (initialValues: Partial<FormikConnectionFormValues>, error: unknown) => {
  jest.spyOn(connectionFormService, "useConnectionFormService").mockImplementation(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { initialValues } as any;
  });
  jest.spyOn(formik, "useField").mockImplementationOnce(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return [{}, { error }] as any; // no error
  });
};

describe(`${useStreamsConfigTableRowProps.name}`, () => {
  it("should return default styles for a row that starts enabled", () => {
    testSetup(mockInitialValues, undefined);

    const { result } = renderHook(() => useStreamsConfigTableRowProps(mockStream));

    expect(result.current.streamHeaderContentStyle).toEqual("streamHeaderContent");
    expect(result.current.pillButtonVariant).toEqual("grey");
  });
  it("should return disabled styles for a row that starts disabled", () => {
    testSetup(mockDisabledInitialValues, undefined);

    const { result } = renderHook(() =>
      useStreamsConfigTableRowProps({
        ...mockStream,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        config: { ...mockStream.config!, selected: false },
      })
    );

    expect(result.current.streamHeaderContentStyle).toEqual("streamHeaderContent disabled");
    expect(result.current.pillButtonVariant).toEqual("grey");
  });
  it("should return added styles for a row that is added", () => {
    testSetup(mockDisabledInitialValues, undefined);

    const { result } = renderHook(() => useStreamsConfigTableRowProps(mockStream));

    expect(result.current.streamHeaderContentStyle).toEqual("streamHeaderContent added");
    expect(result.current.pillButtonVariant).toEqual("green");
  });
  it("should return removed styles for a row that is removed", () => {
    testSetup(mockInitialValues, undefined);

    const { result } = renderHook(() =>
      useStreamsConfigTableRowProps({
        ...mockStream,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        config: { ...mockStream.config!, selected: false },
      })
    );

    expect(result.current.streamHeaderContentStyle).toEqual("streamHeaderContent removed");
    expect(result.current.pillButtonVariant).toEqual("red");
  });
  it("should return updated styles for a row that is updated", () => {
    // eslint-disable-next-line
    testSetup(mockInitialValues, undefined);

    const { result } = renderHook(() =>
      useStreamsConfigTableRowProps({
        ...mockStream,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        config: { ...mockStream.config!, syncMode: "incremental", destinationSyncMode: "append_dedup" },
      })
    );

    expect(result.current.streamHeaderContentStyle).toEqual("streamHeaderContent changed");
    expect(result.current.pillButtonVariant).toEqual("blue");
  });

  it("should return added styles for a row that is both added and updated", () => {
    testSetup(mockDisabledInitialValues, undefined);

    const { result } = renderHook(() =>
      useStreamsConfigTableRowProps({
        ...mockStream,
        config: { selected: true, syncMode: "incremental", destinationSyncMode: "append_dedup" }, // selected true, new sync, mode and destination sync mode
      })
    );

    expect(result.current.streamHeaderContentStyle).toEqual("streamHeaderContent added");
    expect(result.current.pillButtonVariant).toEqual("green");
  });
});

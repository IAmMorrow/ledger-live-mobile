// @flow
import React, { useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { ScreenName } from "../../const";
import SignTransactionSummary from "../../screens/SendFunds/04-Summary";
import SelectDevice from "../../screens/SelectDevice";
import SignTransactionConnectDevice from "../../screens/SignTransaction/02-ConnectDevice";
import SignTransactionValidationError from "../../screens/SignTransaction/03-ValidationError";
import { getStackNavigatorConfig } from "../../navigation/navigatorConfig";
import StepHeader from "../StepHeader";

const totalSteps = "3";

export default function SignTransactionNavigator() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const stackNavigationConfig = useMemo(
    () => getStackNavigatorConfig(colors, true),
    [colors],
  );

  // @TODO replace with correct error
  const listeners = ({ route }) => ({
    beforeRemove: () =>
      route.params?.onError(
        route.params.error || new Error("Signature interrupted by user"),
      ),
  });

  return (
    <Stack.Navigator screenOptions={stackNavigationConfig}>
      <Stack.Screen
        name={ScreenName.SignTransactionSummary}
        component={SignTransactionSummary}
        options={{
          headerTitle: () => (
            <StepHeader
              title={t("signTransaction.stepperHeader.summary")}
              subtitle={t("signTransaction.stepperHeader.stepRange", {
                currentStep: "1",
                totalSteps,
              })}
            />
          ),
        }}
        listeners={listeners}
      />
      <Stack.Screen
        name={ScreenName.SignTransactionSelectDevice}
        component={SelectDevice}
        options={{
          headerTitle: () => (
            <StepHeader
              title={t("signTransaction.stepperHeader.selectDevice")}
              subtitle={t("signTransaction.stepperHeader.stepRange", {
                currentStep: "2",
                totalSteps,
              })}
            />
          ),
        }}
        listeners={listeners}
      />
      <Stack.Screen
        name={ScreenName.SignTransactionConnectDevice}
        component={SignTransactionConnectDevice}
        options={{
          headerTitle: () => (
            <StepHeader
              title={t("signTransaction.stepperHeader.connectDevice")}
              subtitle={t("signTransaction.stepperHeader.stepRange", {
                currentStep: "2",
                totalSteps,
              })}
            />
          ),
        }}
      />
      <Stack.Screen
        name={ScreenName.SignTransactionValidationError}
        component={SignTransactionValidationError}
        options={{
          headerShown: false,
        }}
        listeners={listeners}
      />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
import { Form } from "antd";

import Item from "antd/es/list/Item";
import { useTranslation } from "react-i18next";
import {
  HiddenDesktop,
  StyledBreadcrumb,
  StyledBreadcrumbItem,
  StyledContent,
  StyledLayout,
  StyledSider,
} from "../../components/StyledComponents";
import { SettingsSubNav } from "../../components/settings/SettingsSubNav";
import { OptionsList, TeddyCloudApi } from "../../api";
import { defaultAPIConfig } from "../../config/defaultApiConfig";
import { useEffect, useState } from "react";
import OptionItem from "../../components/settings/OptionItem";
import { Formik } from "formik";

const api = new TeddyCloudApi(defaultAPIConfig());

/** TODO: Create validation schema for all settings before submitting them to backend
const settingsValidationSchema = Yup.object().shape({
  test: Yup.string().required("Dies ist ein Pflichtfeld."),
  booleanToCheck: Yup.string()
    .required("Pflichtfeld.")
    .oneOf(["on"], "Muss true sein."),
});
 */

export const SettingsPage = () => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<OptionsList | undefined>();

  useEffect(() => {
    const fetchOptions = async () => {
      const optionsRequest = (await api.apiGetIndexGetRaw()) as OptionsList;
      if (
        optionsRequest?.options?.length &&
        optionsRequest?.options?.length > 0
      ) {
        setOptions(optionsRequest);
      }
    };

    fetchOptions();
  }, []);

  return (
    <>
      <StyledSider>
        <SettingsSubNav />
      </StyledSider>
      <StyledLayout>
        <HiddenDesktop>
          <SettingsSubNav />
        </HiddenDesktop>
        <StyledBreadcrumb
          items={[
            { title: t("home.navigationTitle") },
            { title: t("settings.navigationTitle") },
          ]}
        />
        <StyledContent>
          <h1>{t(`settings.title`)}</h1>

          <Formik
            //validationSchema={settingsValidationSchema}
            initialValues={{
              test: "test",
            }}
            onSubmit={(values: any) => {
              // nothing to submit because of field onchange
            }}
          >
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
            >
              {options?.options?.map((option, index, array) => {
                const parts = option.iD.split(".");
                const lastParts = array[index - 1]
                  ? array[index - 1].iD.split(".")
                  : [];
                return (
                  <>
                    {parts.slice(0, -1).map((part, index) => {
                      if (lastParts[index] !== part) {
                        if (index === 0) {
                          return (
                            <h3
                              style={{
                                marginLeft: `${index * 20}px`,
                                marginBottom: "10px",
                              }}
                              key={index}
                            >
                              Category {part}
                            </h3>
                          );
                        } else {
                          return (
                            <h4
                              style={{
                                marginLeft: `${index * 10}px`,
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                              key={index}
                            >
                              .{part}
                            </h4>
                          );
                        }
                      }
                      return null;
                    })}

                    <OptionItem option={option} />
                  </>
                );
              })}
            </Form>
          </Formik>
        </StyledContent>
      </StyledLayout>
    </>
  );
};

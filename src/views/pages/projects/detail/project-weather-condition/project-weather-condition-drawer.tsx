import { FormikProps } from 'formik';
import React from 'react';
import weatherConditionApiService from 'src/services/project/weather-condition-service';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { WeatherCondition } from 'src/types/project/weather-condition';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import WeatherConditionForm from './project-weather-condition-form';

interface WeatherConditionDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectId: string;
  weatherCondition: WeatherCondition;
}

const validationSchema = yup.object().shape({
  weather_type: yup.string().required('Weather Type is Required')
});

const WeatherConditionDrawer: React.FC<WeatherConditionDrawerType> = (props) => {
  const { open, toggle, refetch, weatherCondition, projectId } = props;

  const isEdit = weatherCondition?.id ? true : false;

  const createWeatherCondition = async (body: IApiPayload<WeatherCondition>) => {
    return await weatherConditionApiService.create(body);
  };

  const editWeatherCondition = async (body: IApiPayload<WeatherCondition>) => {
    return await weatherConditionApiService.update(weatherCondition?.id || '', body);
  };

  const getPayload = (values: WeatherCondition): IApiPayload<WeatherCondition> => ({
    data: {
      ...values,
      id: weatherCondition?.id,
      project_id: projectId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<WeatherCondition>, payload: IApiPayload<WeatherCondition>) => {
    refetch();
    toggle();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`project.other.weather-condition.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.weather-condition.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={weatherCondition}
          createActionFunc={isEdit ? editWeatherCondition : createWeatherCondition}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<WeatherCondition>) => {
            return <WeatherConditionForm formik={formik} projectId={projectId} defaultLocaleData={{} as WeatherCondition} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default WeatherConditionDrawer;

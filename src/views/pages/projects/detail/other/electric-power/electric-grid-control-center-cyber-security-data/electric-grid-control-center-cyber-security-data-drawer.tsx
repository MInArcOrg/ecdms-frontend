"use client"
import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import ElectricGridControlCenterCyberSecurityDataForm from "./electric-grid-control-center-cyber-security-data-form"
import { useState } from "react"
import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { ElectricGridControlCenterCyberSecurityData, ElectricGridControlCenterData } from "src/types/project/other"
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout"

interface ElectricGridControlCenterCyberSecurityDataDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  electricGridControlCenterCyberSecurityData: ElectricGridControlCenterCyberSecurityData
  projectId: string
  otherSubMenu?: DetailSubMenuItemChild;
  electricGridControlCenterData: ElectricGridControlCenterData[]
  cyberSecurityMeasuresTypes: any[]
  cyberSecurityAuditsFrequencies: any[]
}

const ElectricGridControlCenterCyberSecurityDataDrawer = (props: ElectricGridControlCenterCyberSecurityDataDrawerType) => {
  const { 
    open, 
    toggle, 
    refetch, 
    electricGridControlCenterCyberSecurityData, 
    projectId, 
    otherSubMenu, 
    electricGridControlCenterData,
    cyberSecurityMeasuresTypes,
    cyberSecurityAuditsFrequencies
  } = props

  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    electric_grid_control_center_data_id: yup.string().required("Electric Grid Control Center Data is required"),
    name: yup.string().required("Name is required"),
    cyber_security_measures_implemented: yup.boolean().nullable(),
    cyber_security_measures_type: yup.string().required("Cyber Security Measures Type is required"),
    cyber_security_audits_frequency: yup.string().required("Cyber Security Audits Frequency is required"),
    remark: yup.string().nullable(),
  })

  const isEdit = Boolean(electricGridControlCenterCyberSecurityData?.id)

  const createElectricGridControlCenterCyberSecurityData = async (body: IApiPayload<ElectricGridControlCenterCyberSecurityData>) =>
    projectOtherApiSecondService<ElectricGridControlCenterCyberSecurityData>().create(otherSubMenu?.apiRoute || "", body)

  const editElectricGridControlCenterCyberSecurityData = async (body: IApiPayload<ElectricGridControlCenterCyberSecurityData>) =>
    projectOtherApiSecondService<ElectricGridControlCenterCyberSecurityData>().update(
      otherSubMenu?.apiRoute || "", 
      electricGridControlCenterCyberSecurityData?.id || "", 
      body
    )

  const getPayload = (values: ElectricGridControlCenterCyberSecurityData) => ({
    data: {
      project_id: projectId,
      electric_grid_control_center_data_id: values.electric_grid_control_center_data_id,
      name: values.name,
      cyber_security_measures_implemented: values.cyber_security_measures_implemented,
      cyber_security_measures_type: values.cyber_security_measures_type,
      cyber_security_audits_frequency: values.cyber_security_audits_frequency,
      remark: values.remark,
      id: electricGridControlCenterCyberSecurityData?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = async (response: IApiResponse<ElectricGridControlCenterCyberSecurityData>, payload: IApiPayload<ElectricGridControlCenterCyberSecurityData>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.electric_grid_control_center_cyber_security_data, response.payload.id, "", "")
    }

    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.electric-grid-control-center-cyber-security-data.${isEdit ? `edit-electric-grid-control-center-cyber-security-data` : `create-electric-grid-control-center-cyber-security-data`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.electric-grid-control-center-cyber-security-data.${isEdit ? `edit-electric-grid-control-center-cyber-security-data` : `create-electric-grid-control-center-cyber-security-data`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...electricGridControlCenterCyberSecurityData,
            cyber_security_measures_implemented: electricGridControlCenterCyberSecurityData?.cyber_security_measures_implemented || false,
          }}
          createActionFunc={isEdit ? editElectricGridControlCenterCyberSecurityData : createElectricGridControlCenterCyberSecurityData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ElectricGridControlCenterCyberSecurityData>) => {
            return <ElectricGridControlCenterCyberSecurityDataForm 
              file={uploadableFile} 
              onFileChange={onFileChange} 
              formik={formik} 
              electricGridControlCenterData={electricGridControlCenterData}
              cyberSecurityMeasuresTypes={cyberSecurityMeasuresTypes}
              cyberSecurityAuditsFrequencies={cyberSecurityAuditsFrequencies}
            />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default ElectricGridControlCenterCyberSecurityDataDrawer
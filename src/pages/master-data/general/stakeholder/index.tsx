import { CircularProgress, useMediaQuery, useTheme } from '@mui/material'
import { Fragment, useState } from 'react'
import GeneralLayout from '../GeneralLayout'
import { useTranslation } from 'react-i18next'

function AgeLevels() {

  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useTranslation()

  return (
    <div>
      <GeneralLayout>
        <Fragment>
        </Fragment>
      </GeneralLayout>
    </div>
  )
}

export default AgeLevels

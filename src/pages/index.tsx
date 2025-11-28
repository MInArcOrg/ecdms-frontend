// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Spinner Import

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'
import FallbackSpinner from 'src/@core/components/spinner'

/**
 *  Set Home URL based on User Roles
 */

const Home = () => {
  const defaultRoute = '/dashboard'

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  router.replace(defaultRoute)

  return <FallbackSpinner sx={{ height: '100%' }} />
}

export default Home

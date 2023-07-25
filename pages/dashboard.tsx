import React from 'react'
import { AuthAction, withUser } from 'next-firebase-auth'
import LayoutDashboard from '../layout/LayoutDashboard'

const Dashboard = () => {
  return (
    <LayoutDashboard>
    <div>
      dashboard
    </div>
  </LayoutDashboard>
  )
}
export default withUser({
  // whenAuthed: AuthAction.RENDER
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Dashboard)
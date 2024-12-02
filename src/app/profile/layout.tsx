import Loading from '@/components/loading/Loading'
import ProfileNavbar from '@/components/profileNavbar/ProfileNavbar'
import React, { Suspense } from 'react'

const ProfileLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
        <ProfileNavbar />
        {children}
    </div>
  )
}

export default ProfileLayout
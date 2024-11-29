import ProfileNavbar from '@/components/profileNavbar/ProfileNavbar'
import React from 'react'

const ProfileLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
        <ProfileNavbar />
        {children}
    </div>
  )
}

export default ProfileLayout
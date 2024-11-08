import ProfileNavbar from '@/components/profileNavbar/ProfileNavbar'
import React from 'react'

const ProfileLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
        <h4>Wybierz typ profilu</h4>
        <ProfileNavbar />
        {children}
    </div>
  )
}

export default ProfileLayout
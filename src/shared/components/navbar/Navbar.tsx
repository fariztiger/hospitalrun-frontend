import { Navbar as HospitalRunNavbar } from '@hospitalrun/components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { logout } from '../../../user/user-slice'
import useTranslator from '../../hooks/useTranslator'
import { RootState } from '../../store'
import pageMap, { Page } from './pageMap'

const Navbar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslator()
  const { permissions, user } = useSelector((state: RootState) => state.user)

  const navigateTo = (location: string) => {
    history.push(location)
  }

  const dividerAboveLabels = [
    'scheduling.appointments.new',
    'labs.requests.new',
    'medications.requests.new',
    'incidents.reports.new',
    'imagings.requests.new',
    'settings.label',
  ]

  function getDropdownListOfPages(pages: Page[]) {
    return pages
      .filter((page) => !page.permission || permissions.includes(page.permission))
      .map((page) => ({
        type: 'link',
        label: t(page.label),
        icon: `${page.icon}`,
        onClick: () => {
          navigateTo(page.path)
        },
        dividerAbove: dividerAboveLabels.includes(page.label),
      }))
  }

  // For Mobile, hamburger menu
  const hambergerPages = Object.keys(pageMap).map((key) => pageMap[key])

  // For Desktop, add shortcuts menu
  const addPages = [
    pageMap.newPatient,
    pageMap.newAppointment,
    pageMap.newMedication,
    pageMap.newLab,
    pageMap.newImaging,
    pageMap.newIncident,
  ]

  return (
    <HospitalRunNavbar
      bg="dark"
      variant="dark"
      navItems={[
        {
          name: 'menu',
          size: 'lg',
          type: 'link-list-icon',
          children: getDropdownListOfPages(hambergerPages),
          label: '',
          className: 'nav-hamberger pr-4 d-md-none',
        },
        {
          type: 'image',
          src:
            '<?xml version="1.0" encoding="UTF-8" standalone="no"?>
            < svg
   id="Layer_1"
   data- name="Layer 1"
   viewBox = "0 0 299 299"
   version = "1.1"
   sodipodi: docname = "download.svg"
   inkscape: version = "1.1 (c68e22c387, 2021-05-23)"
   xmlns: inkscape = "http://www.inkscape.org/namespaces/inkscape"
   xmlns: sodipodi = "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns = "http://www.w3.org/2000/svg"
   xmlns: svg = "http://www.w3.org/2000/svg"
   xmlns: rdf = "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns: cc = "http://creativecommons.org/ns#"
   xmlns: dc = "http://purl.org/dc/elements/1.1/" >
  <sodipodi:namedview
     id="namedview17"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     showgrid="false"
     inkscape:zoom="2.7826087"
     inkscape:cx="149.32031"
     inkscape:cy="149.67969"
     inkscape:window-width="1920"
     inkscape:window-height="1017"
     inkscape:window-x="-8"
     inkscape:window-y="-8"
     inkscape:window-maximized="1"
     inkscape:current-layer="Layer_1" />
  <defs
     id="defs11">
    <rect
       x="11.140625"
       y="102.78125"
       width="271.32812"
       height="83.375"
       id="rect26164" />
    <style
       id="style2">.cls-1{fill:url(#linear-gradient);}</style>
    <linearGradient
       id="linear-gradient"
       x1="72.58"
       y1="16.04"
       x2="227.31"
       y2="284.02"
       gradientUnits="userSpaceOnUse">
      <stop
         offset="0.01"
         stop-color="#60d1bb"
         id="stop4" />
      <stop
         offset="0.5"
         stop-color="#1abc9c"
         id="stop6" />
      <stop
         offset="1"
         stop-color="#009b9e"
         id="stop8" />
    </linearGradient>
  </defs>
  <title
     id="title13">cross-icon</title>
  <path
     id="cross"
     class="cls-1"
     d="M292.94,97.46H205.3V7.06A6.56,6.56,0,0,0,198.74.5H101.26A6.56,6.56,0,0,0,94.7,7.06v90.4H7.06A6.58,6.58,0,0,0,.5,104V196.3a6.23,6.23,0,0,0,6.23,6.24h88v90.4a6.56,6.56,0,0,0,6.56,6.56h97.48a6.56,6.56,0,0,0,6.56-6.56v-90.4h88a6.23,6.23,0,0,0,6.23-6.24V104A6.58,6.58,0,0,0,292.94,97.46Z"
     transform="translate(-0.5 -0.5)" />
  <text
     xml:space="preserve"
     id="text26162"
     style="font-style:normal;font-weight:normal;font-size:64px;line-height:1.25;font-family:sans-serif;white-space:pre;shape-inside:url(#rect26164);fill:#000000;fill-opacity:1;stroke:none"
     transform="matrix(1.449563,0,0,1.8235677,38.053192,-102.79323)"><tspan
       x="11.140625"
       y="159.40625"
       id="tspan48880"><tspan
         style="font-family:Adca;-inkscape-font-specification:Adca"
         id="tspan48878">OPD</tspan></tspan></text>
  <metadata
     id="metadata48862">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:title>cross-icon</dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
</svg >',
          onClick: () => {
            navigateTo('/')
          },
          className: 'nav-icon',
        },
        {
          type: 'header',
          label: 'HospitalRun',
          onClick: () => {
            navigateTo('/')
          },
          className: 'nav-header',
        },
        {
          type: 'link-list-icon',
          alignRight: true,
          children: getDropdownListOfPages(addPages),
          className: 'ml-auto nav-add-new d-none d-md-block',
          iconClassName: 'align-bottom',
          label: 'Add',
          name: 'add',
          size: 'lg',
        },
        {
          type: 'link-list-icon',
          alignRight: true,
          children: [
            {
              type: 'link',
              label: `${t('user.login.currentlySignedInAs')} ${user?.givenName} ${
                user?.familyName
              }`,
              onClick: () => {
                navigateTo('/settings')
              },
            },
            {
              type: 'link',
              label: t('settings.label'),
              onClick: () => {
                navigateTo('/settings')
              },
            },
            {
              type: 'link',
              label: t('actions.logout'),
              onClick: () => {
                dispatch(logout())
                navigateTo('/login')
              },
            },
          ],
          className: 'pl-2 d-none d-md-block nav-account',
          iconClassName: 'align-bottom',
          label: 'Patient',
          name: 'patient',
          size: 'lg',
        },
      ]}
    />
  )
}
export default Navbar

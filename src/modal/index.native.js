import React, { useRef, useEffect } from 'react'
import RBSheet from "react-native-raw-bottom-sheet"
import { Dimensions } from "react-native"

export default (props) => {
  const {
    open,
    autoOpen,
    routerQueryPath = '',
    routerQueryCondition,
    canClose = true,
    showNavigation = true,
    modalClassName = '',
    contentClassName = '',
    children
  } = props

  const _sheet = useRef(null)
  useEffect(() => {
    if (open) {
      _open()
    } else {
      close()
    }
  }, [open])

  const _open = () => {
    _sheet.current.open()
    vibrate()
  }

  const close = () => {
    _sheet.current.close()
  }

  return (
    <RBSheet
      {...props}
      ref={_sheet}
      animationType={'fade'}
      height={props.height
        ? props.height
        : (Dimensions.get('window').height * 0.7)}
      closeOnDragDown={false}>
      {open
        ? children
        : null}
    </RBSheet>
  )
}


import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

const vibrate = () => {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  }

  ReactNativeHapticFeedback.trigger('impactLight', options)
}

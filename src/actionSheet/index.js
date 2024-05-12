import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'
import Modal from '@mui/material/Modal'
import CloseButton from '@mui/icons-material/Close'
import ArrowBackButton from '@mui/icons-material/ArrowBack'
import IconButton from '@mui/material/IconButton'
import FadeIn from 'react-fade-in'

export default (props) => {
  const {
    autoOpen,
    routerQueryPath = '',
    routerQueryCondition,
    canClose = true,
    showNavigation = true,
    modalClassName = '',
    contentClassName = '',
    children
  } = props

  const router = useRouter()
  const { returnHref, } = useContextualRouting()
  const open = autoOpen
    || router.query[routerQueryPath] === routerQueryCondition
    || (router.query[routerQueryPath] && routerQueryCondition) === '*'
  const baseUrl = useRef()

  useEffect(() => {
    baseUrl.current = router.asPath
  }, [])

  const onClose = () => {
    if (!canClose) {
      return
    }
    router.push(returnHref)
    props.onClose && props.onClose()
  }

  const isBase = () => {
    if (!baseUrl.current) { return true }
    return baseUrl.current === router.asPath
  }

  const onBackPressed = () => {
    if (isBase()) {
      return
    }

    router.back()
  }

  return <Modal
    open={open}
    onBackdropClick={onClose}
    onClose={onClose}
    className={`
            mx-auto
            mt-0
            mb-0
            overflow-scroll
            max-w-3xl
            ${modalClassName}`}
    aria-labelledby="generic-modal-title"
    aria-describedby="generic-modal-description">
    <FadeIn
      transitionDuration={600}
      className={`
                overflow-hidden
                rounded-none
                md:rounded-3xl
                bg-white
                `}>
      <div className={`
                    w-full
                    h-full
                    overflow-scroll

                    px-10
                    pt-14
                ${contentClassName}`}>
        {open && children}
      </div>
      <div className='
                absolute
                right-0
                left-0
                top-0
                h-12
                bg-white
                bg-opacity-0'>
        {canClose &&
          <div className='absolute right-4 top-4'>
            <IconButton aria-label="Close modal" component="span" onClick={onClose} >
              <CloseButton />
            </IconButton>
          </div>
        }
        {(!isBase() && showNavigation) &&
          <div className='absolute left-4 top-4'>
            <IconButton aria-label="Back modal"
              className='bg-white'
              color={'primary'}
              component="span"
              size="large"
              onClick={onBackPressed} >
              <ArrowBackButton />
            </IconButton>
          </div>
        }
      </div>
    </FadeIn>
  </Modal>
}

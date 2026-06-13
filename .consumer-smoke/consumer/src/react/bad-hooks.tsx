import { useEffect } from 'react'

export function BadHooks({ enabled }: { enabled: boolean }): null {
  if (enabled) {
    useEffect(() => {}, [])
  }

  return null
}

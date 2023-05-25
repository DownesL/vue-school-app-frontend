import type { RouteLocation } from 'vue-router'

export function useSetTitle(to: RouteLocation) {
  document.title = (to.meta.title as string) ?? 'UpToDate'
}

import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { BaseRouteReuseStrategy } from './base-route-reuse-strategy';

export class CustomRouteReuseStrategy extends BaseRouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const pathsToDetach = [''];
    return pathsToDetach.includes(route.routeConfig?.path ?? '');
  }

  override store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.storedRoutes.set(route.routeConfig!.path!, handle);
  }

  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.storedRoutes.get(route.routeConfig!.path!);
  }

  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null  {
    return this.storedRoutes.get(route.routeConfig!.path!) as DetachedRouteHandle;
  }

}

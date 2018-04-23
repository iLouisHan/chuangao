import { Injectable, ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injector } from '@angular/core';
import { LoadingComponent } from './loading.component';

@Injectable()
export class LoadingService {
  private container: HTMLElement;
  private componentRootNode: HTMLElement;

  constructor(
    private applicationRef: ApplicationRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {

  }

  createLoading() {
    let factory = this.resolver.resolveComponentFactory(LoadingComponent);
    let componentRef = factory.create(this.injector);
    this.componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    if(!this.container) {
      let componentRootViewContainer = this.applicationRef['components'][0];
      this.container = (componentRootViewContainer.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }
    this.applicationRef.attachView(componentRef.hostView);
    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });

    this.container.appendChild(this.componentRootNode);

    return componentRef.instance;
  }

  clearLoading() {
    if (this.container && this.componentRootNode) {
      this.container.removeChild(this.componentRootNode);
    }
  }

}

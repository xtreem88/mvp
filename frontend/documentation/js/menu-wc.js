'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">mvp-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-bc61518f8276813f882b05b7585735f85a6ed721f8385f5721801ec4d810d93226c7777f1ffcc3f259610de52e5b26594c22fcce95a5529ac375ce78f1ada4c3"' : 'data-target="#xs-components-links-module-AppModule-bc61518f8276813f882b05b7585735f85a6ed721f8385f5721801ec4d810d93226c7777f1ffcc3f259610de52e5b26594c22fcce95a5529ac375ce78f1ada4c3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-bc61518f8276813f882b05b7585735f85a6ed721f8385f5721801ec4d810d93226c7777f1ffcc3f259610de52e5b26594c22fcce95a5529ac375ce78f1ada4c3"' :
                                            'id="xs-components-links-module-AppModule-bc61518f8276813f882b05b7585735f85a6ed721f8385f5721801ec4d810d93226c7777f1ffcc3f259610de52e5b26594c22fcce95a5529ac375ce78f1ada4c3"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppFooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppFooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppNavBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppNavBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-bc61518f8276813f882b05b7585735f85a6ed721f8385f5721801ec4d810d93226c7777f1ffcc3f259610de52e5b26594c22fcce95a5529ac375ce78f1ada4c3"' : 'data-target="#xs-injectables-links-module-AppModule-bc61518f8276813f882b05b7585735f85a6ed721f8385f5721801ec4d810d93226c7777f1ffcc3f259610de52e5b26594c22fcce95a5529ac375ce78f1ada4c3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-bc61518f8276813f882b05b7585735f85a6ed721f8385f5721801ec4d810d93226c7777f1ffcc3f259610de52e5b26594c22fcce95a5529ac375ce78f1ada4c3"' :
                                        'id="xs-injectables-links-module-AppModule-bc61518f8276813f882b05b7585735f85a6ed721f8385f5721801ec4d810d93226c7777f1ffcc3f259610de52e5b26594c22fcce95a5529ac375ce78f1ada4c3"' }>
                                        <li class="link">
                                            <a href="injectables/ApiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AppHttpHeaders.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHttpHeaders</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VendingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VendingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppStoreModule.html" data-type="entity-link" >AppStoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppStoreModule-5f7d17346d9a954b7a37ddc907f5507adf3ab3b726ee8fa02e2e4c53c9aa6075fbfe4049cf087ec7b37ff621cd8fa331af27bbbe068f94db81abafbb425f51bb"' : 'data-target="#xs-injectables-links-module-AppStoreModule-5f7d17346d9a954b7a37ddc907f5507adf3ab3b726ee8fa02e2e4c53c9aa6075fbfe4049cf087ec7b37ff621cd8fa331af27bbbe068f94db81abafbb425f51bb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppStoreModule-5f7d17346d9a954b7a37ddc907f5507adf3ab3b726ee8fa02e2e4c53c9aa6075fbfe4049cf087ec7b37ff621cd8fa331af27bbbe068f94db81abafbb425f51bb"' :
                                        'id="xs-injectables-links-module-AppStoreModule-5f7d17346d9a954b7a37ddc907f5507adf3ab3b726ee8fa02e2e4c53c9aa6075fbfe4049cf087ec7b37ff621cd8fa331af27bbbe068f94db81abafbb425f51bb"' }>
                                        <li class="link">
                                            <a href="injectables/DepositEffects.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepositEffects</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductEffects.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductEffects</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductPaginationEffects.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductPaginationEffects</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EntityStoreModule.html" data-type="entity-link" >EntityStoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EntityStoreModule-db862f68ec846829923740c21e38a5eac334b04302d5c0fc8b911e9d6d0901a0aa7756c711e2bf8dde379f3337b6a115262008392eef3de5b4f3e275971da931"' : 'data-target="#xs-injectables-links-module-EntityStoreModule-db862f68ec846829923740c21e38a5eac334b04302d5c0fc8b911e9d6d0901a0aa7756c711e2bf8dde379f3337b6a115262008392eef3de5b4f3e275971da931"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EntityStoreModule-db862f68ec846829923740c21e38a5eac334b04302d5c0fc8b911e9d6d0901a0aa7756c711e2bf8dde379f3337b6a115262008392eef3de5b4f3e275971da931"' :
                                        'id="xs-injectables-links-module-EntityStoreModule-db862f68ec846829923740c21e38a5eac334b04302d5c0fc8b911e9d6d0901a0aa7756c711e2bf8dde379f3337b6a115262008392eef3de5b4f3e275971da931"' }>
                                        <li class="link">
                                            <a href="injectables/DepositDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepositDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductDataService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-cec9f29fa30ab88453a4a207c68a284275e9c3c4f709496ea15911782dde8eb75a6e33c7f594f88b1fafd27a5d213ccbf48e7bc355b1e40a2d1e74b6fdd1b997"' : 'data-target="#xs-components-links-module-LoginModule-cec9f29fa30ab88453a4a207c68a284275e9c3c4f709496ea15911782dde8eb75a6e33c7f594f88b1fafd27a5d213ccbf48e7bc355b1e40a2d1e74b6fdd1b997"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-cec9f29fa30ab88453a4a207c68a284275e9c3c4f709496ea15911782dde8eb75a6e33c7f594f88b1fafd27a5d213ccbf48e7bc355b1e40a2d1e74b6fdd1b997"' :
                                            'id="xs-components-links-module-LoginModule-cec9f29fa30ab88453a4a207c68a284275e9c3c4f709496ea15911782dde8eb75a6e33c7f594f88b1fafd27a5d213ccbf48e7bc355b1e40a2d1e74b6fdd1b997"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProductModule-4f13309aa67655181b50e7874b0358ea2fac3b97f2e0fb0c8fff8c553ae298b884f96ff363d10047fd736253fa0b62459cb6359c5f8ce8f065c5ef81c61c1be7"' : 'data-target="#xs-components-links-module-ProductModule-4f13309aa67655181b50e7874b0358ea2fac3b97f2e0fb0c8fff8c553ae298b884f96ff363d10047fd736253fa0b62459cb6359c5f8ce8f065c5ef81c61c1be7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProductModule-4f13309aa67655181b50e7874b0358ea2fac3b97f2e0fb0c8fff8c553ae298b884f96ff363d10047fd736253fa0b62459cb6359c5f8ce8f065c5ef81c61c1be7"' :
                                            'id="xs-components-links-module-ProductModule-4f13309aa67655181b50e7874b0358ea2fac3b97f2e0fb0c8fff8c553ae298b884f96ff363d10047fd736253fa0b62459cb6359c5f8ce8f065c5ef81c61c1be7"' }>
                                            <li class="link">
                                                <a href="components/ProductComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductFormsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductFormsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductRoutingModule.html" data-type="entity-link" >ProductRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/VendingModule.html" data-type="entity-link" >VendingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VendingModule-dc4f36d861d7d7ea77428287dd7cb60e9b1ee49e5f7231a28b2eb53bffe0b78c0a9575273f789eb053aeaec800cbb68bd8f51a7b19b4cf116c0b0589e2c43c3a"' : 'data-target="#xs-components-links-module-VendingModule-dc4f36d861d7d7ea77428287dd7cb60e9b1ee49e5f7231a28b2eb53bffe0b78c0a9575273f789eb053aeaec800cbb68bd8f51a7b19b4cf116c0b0589e2c43c3a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VendingModule-dc4f36d861d7d7ea77428287dd7cb60e9b1ee49e5f7231a28b2eb53bffe0b78c0a9575273f789eb053aeaec800cbb68bd8f51a7b19b4cf116c0b0589e2c43c3a"' :
                                            'id="xs-components-links-module-VendingModule-dc4f36d861d7d7ea77428287dd7cb60e9b1ee49e5f7231a28b2eb53bffe0b78c0a9575273f789eb053aeaec800cbb68bd8f51a7b19b4cf116c0b0589e2c43c3a"' }>
                                            <li class="link">
                                                <a href="components/VendingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VendingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VendingRoutingModule.html" data-type="entity-link" >VendingRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link" >AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppSelectors.html" data-type="entity-link" >AppSelectors</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationEffects.html" data-type="entity-link" >AuthenticationEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link" >AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VendingEffects.html" data-type="entity-link" >VendingEffects</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AppClientHttpInterceptor.html" data-type="entity-link" >AppClientHttpInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/AppErrorInterceptor.html" data-type="entity-link" >AppErrorInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link" >AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuardService.html" data-type="entity-link" >RoleGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ApiClient.html" data-type="entity-link" >ApiClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApiError.html" data-type="entity-link" >ApiError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppDataState.html" data-type="entity-link" >AppDataState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link" >AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BuyResponse.html" data-type="entity-link" >BuyResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoggedInUser.html" data-type="entity-link" >LoggedInUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginError.html" data-type="entity-link" >LoginError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginRequest.html" data-type="entity-link" >LoginRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductApiResponse.html" data-type="entity-link" >ProductApiResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductData.html" data-type="entity-link" >ProductData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductPagination.html" data-type="entity-link" >ProductPagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductPaginationState.html" data-type="entity-link" >ProductPaginationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductsApiResponse.html" data-type="entity-link" >ProductsApiResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestPayload.html" data-type="entity-link" >RequestPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SessionState.html" data-type="entity-link" >SessionState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendingMeta.html" data-type="entity-link" >VendingMeta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VendingState.html" data-type="entity-link" >VendingState</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
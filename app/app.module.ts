import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule,MatAutocompleteModule, MatTooltipModule} from '@angular/material';
import { ListItemComponent } from './list-item/list-item.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DetailedComponent } from './detailed/detailed.component';
import { ProductComponent } from './product/product.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PhotosComponent } from './photos/photos.component';
import { SellerComponent } from './seller/seller.component';
import { SimilarComponent } from './similar/similar.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CarmodalComponent } from './carmodal/carmodal.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ListItemComponent,
    DetailedComponent,
    ProductComponent,
    ShippingComponent,
    PhotosComponent,
    SellerComponent,
    SimilarComponent,
    WishlistComponent,
    CarmodalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,
    NgxPaginationModule,
    MatTooltipModule,
    NgbModule.forRoot(),
    RoundProgressModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[CarmodalComponent]
})
export class AppModule { }

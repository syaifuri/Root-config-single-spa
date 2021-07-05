import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { Subscription } from 'rxjs';
import {
  singleSpaPropsSubject,
  SingleSpaProps,
} from 'src/single-spa/single-spa-props';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'logdata-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  closeResult: string;
  title = 'logdata';
  equipmentid = '';
  singleSpaProps: SingleSpaProps;
  subscription: Subscription;

  // OR if you don't need to access `singleSpaProps` inside the component
  // then create `Observable` property and use it in template with `async` pipe.
  singleSpaProps$ = singleSpaPropsSubject.asObservable();

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private modalService: NgbModal){}


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription = singleSpaPropsSubject.subscribe(
      props => (this.singleSpaProps = props),
    );
    this.equipmentid = JSON.parse(JSON.stringify(this.singleSpaProps['equipmentId']));
    console.log('this is angular microfrontent eqstat : ',this.singleSpaProps);


  }

// Modal functions

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
  // end of exampl modal

}

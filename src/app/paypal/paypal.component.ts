import { VrstaPlacanja } from './../components/enums/vrstaPlacanja.enum';
import { InsuranceDataService } from './../components/insurance/insurance-data.service';
import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
declare let paypal: any;
let self: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  //Directive for amount of the transaction, should be passed to the function below somehow - line 40
  @Input() amount: number;
  @Output() onPayPalButtonClick = new EventEmitter();
  @Output() onCompletePayment = new EventEmitter();

  constructor() { }

  ngOnInit() {


      self = this;


      let amount = this.amount;

      let obj = {

        env: 'sandbox', // sandbox | production

        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create
        client: {
          sandbox:    'AVkFm_WLHuczJc7EX9VsdvIvME1BCSlNwp52aM0g6-yfsjR4r0H-2-lSwFc9vFmmtyFOAIyfPefMijwP',
          production: '<insert production client id>'
        },

        // Show the buyer a 'Pay Now' button in the checkout flow
        commit: true,

        // payment() is called when the button is clicked
        payment: function(data, actions) {

          self.onPayPalButtonClick.emit();

          // Make a call to the REST api to create the payment
          return actions.payment.create({
            payment: {
              transactions: [
                {
                  amount: { total: amount, currency: 'USD' }
                }
              ]
            }
          });
        },

        // onAuthorize() is called when the buyer approves the payment
        onAuthorize: function(data, actions) {
          self.onCompletePayment.emit();

          // Make a call to the REST api to execute the payment
          return actions.payment.execute().then(function() {

            window.alert('Payment Complete!');
          });
        }

      };

      paypal.Button.render(obj, '#paypal-button-container');

    }
}

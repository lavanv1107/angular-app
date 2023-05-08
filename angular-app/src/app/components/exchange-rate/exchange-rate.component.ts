import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoinApiService } from '../../services/coin-api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css'],
})
export class ExchangeRateComponent implements OnInit {
  exchangeRateForm!: FormGroup;

  exchangeRate!: number;
  date: string = '';
  time: string = '';

  fromCurrency: string = '';
  toCurrency: string = '';

  fromAmount: number = 0;
  toAmount: number = 0;

  step: number = 0;
  selectPanelClosed: Boolean = false;
  exchangePanelClosed: Boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private coinApiService: CoinApiService
  ) {}

  ngOnInit() {
    this.exchangeRateForm = this.formBuilder.group({
      fromCurrency: ['', Validators.required],
      toCurrency: ['', Validators.required],
      fromAmount: ['', Validators.required],
      toAmount: ['', Validators.required],
    });

    this.exchangeRateForm.valueChanges.subscribe((values) => {
      if (values.fromCurrency && values.toCurrency) {
        this.getRateInfo();
      }
    });
  }

  onInputFrom(event: any) {
    const input = event.target as HTMLInputElement;
    const capitalizedValue = input.value.toUpperCase();
    input.value = capitalizedValue;
    // Update the form control value with the capitalized value
    this.exchangeRateForm.get('fromCurrency')?.setValue(capitalizedValue);
  }

  onInputTo(event: any) {
    const input = event.target as HTMLInputElement;
    const capitalizedValue = input.value.toUpperCase();
    input.value = capitalizedValue;
    // Update the form control value with the capitalized value
    this.exchangeRateForm.get('toCurrency')?.setValue(capitalizedValue);
  }

  onKeyPress(event: KeyboardEvent) {
    const keyValue = event.key;

    // Only allow numeric values, backspace and delete
    const pattern = /^[0-9.\b]+$/;
    const isValid = pattern.test(keyValue);
    if (!isValid) {
      event.preventDefault();
    }
  }

  async calculateToAmount() {
    const fromAmount = this.exchangeRateForm.get('fromAmount')?.value;

    if (fromAmount) {
      this.toAmount = fromAmount * this.exchangeRate;
      this.exchangeRateForm.get('toAmount')?.setValue(this.toAmount.toFixed(2));
    }
  }

  async calculateFromAmount() {
    const toAmount = this.exchangeRateForm.get('toAmount')?.value;

    if (toAmount) {
      this.fromAmount = toAmount / this.exchangeRate;
      this.exchangeRateForm
        .get('fromAmount')
        ?.setValue(this.fromAmount.toFixed(2));
    }
  }

  async getRateInfo() {
    const fromCurrency = this.exchangeRateForm.get('fromCurrency')?.value;
    const toCurrency = this.exchangeRateForm.get('toCurrency')?.value;
    const exchangeRateData = await firstValueFrom(
      this.coinApiService.getExchangeRate(fromCurrency, toCurrency)
    );
    this.exchangeRate = exchangeRateData.rate;
    const dateTime = new Date(exchangeRateData.time);
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    };
    this.date = dateTime.toLocaleDateString('en-US', dateOptions);
    this.time = dateTime.toLocaleTimeString('en-US', timeOptions);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
    this.selectPanelClosed = true;
    this.exchangePanelClosed = false;
  }

  prevStep() {
    this.step--;
    this.selectPanelClosed = false;
    this.exchangePanelClosed = true;
  }
}

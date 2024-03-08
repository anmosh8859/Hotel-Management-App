import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { Reservation } from 'src/app/models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
      this.reservationForm = this.formBuilder.group({
        checkInDate: ['', [Validators.required,this.checkValidDate]],
        checkOutDate: ['', [Validators.required], [this.checkOutDateValidator]],
        guestName: ['', Validators.required],
        guestEmail: ['', [Validators.required, Validators.email]],
        roomNumber: ['', Validators.required],
      })

      const id = this.activatedRoute.snapshot.paramMap.get('id')
      if(id){
        const reservation = this.reservationService.getReservation(id)
        if(reservation){
          this.reservationForm.patchValue(reservation)
        }
      }
  }

  onSubmit(){
    if(this.reservationForm.valid){
      const reservation: Reservation = this.reservationForm.value

      const id = this.activatedRoute.snapshot.paramMap.get('id')

      if(id){
        this.reservationService.updateReservation(id, reservation)
      } else{
        this.reservationService.addReservation(reservation)
      }

      this.router.navigate(['/list'])
    }
  }

  checkValidDate(control: AbstractControl): { [key: string]: boolean } | null {
    const day = new Date(control.value).getDate();
    const currentDay = new Date().getDate();
    
    if (day < currentDay) {
      return { 'invalidDate': true };
    }
  
    return null;
  }

  checkValidity(date:any){
    const day = new Date(date).getDate();
    const currentDay = new Date().getDate();
    
    if (day < currentDay) {
      return true;
    }
  
    return false;
  }
  

  checkOutDateValidator = (control: AbstractControl): Promise<any> | null => {
    const checkInDate = control.parent?.get('checkInDate')?.value;
    const checkOutDate = control.value;
  
    return Promise.resolve().then(() => {
      if (checkInDate && checkOutDate && checkInDate > checkOutDate) {
        // console.log(this.checkValidDate(checkInDate));
        return { 'invalidCheckOutDate': true };
      }
  
      return null;
    });
  }  
  

}

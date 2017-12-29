import { AbstractControl, ValidationErrors } from "@angular/forms";

export class JmbgValidators {

    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0)
            return { cannotContainSpace: true }; 
        
            return null; 
    }



    static proveraContrBr(control: AbstractControl): ValidationErrors | null {

            if((control.value as string).length == 13) {
                let konCif = "765432765432";
                let raz = 0;
        
                for (let i = 1; i <= 12; i++) {
                    raz = raz + Number((control.value as string).substr(i, 1)) * Number(konCif.substr(i, 1));
                }
    
                raz = 11 - (raz % 11);
                console.log(raz);
                let num = Number((control.value as string).substr(13, 1));
                console.log(num);
                if (raz != 10 && ((raz % 11) === num)) {
                    return { 'proveraContrBr': true };
                }
                else {
                    return null;
                }
            }
    }
        

}





























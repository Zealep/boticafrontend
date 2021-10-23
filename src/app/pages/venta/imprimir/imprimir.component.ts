import { ImprimirDTO } from './../../../model/dto/imprimir';
import { VentaService } from './../../../service/venta.service';
import { ConfirmDialogModel } from './../../../shared/models/confirm-dialog-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.scss']
})
export class ImprimirComponent implements OnInit {

  imprimir: ImprimirDTO;
  urlSafe: string;

  constructor(public dialogRef: MatDialogRef<ImprimirComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private ventaService: VentaService,
    public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.imprimir = this.data.imprimir;
  }

  yes(){


        this.ventaService.imprimir(this.imprimir)
        .subscribe(ticket=>{
          var file = new Blob([ticket], { type: "application/pdf" });

            const url = URL.createObjectURL(file);
            //this.urlSafe= this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(url));
              /*
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.href = url;
            a.download = 'contrato.pdf';
            a.click();
             */

            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);
            iframe.contentWindow.print();

        });
  }
  no(){
    this.dialogRef.close(true);
  }

}

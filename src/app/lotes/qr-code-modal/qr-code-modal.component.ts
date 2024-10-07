import { Component, Inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import QRCode from 'qrcode';

@Component({
  selector: 'app-qr-code-modal',
  templateUrl: './qr-code-modal.component.html',
  styleUrls: ['./qr-code-modal.component.scss']
})
export class QrCodeModalComponent implements AfterViewInit {
  @ViewChild('qrcodeCanvas', { static: false }) qrcodeCanvas: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<QrCodeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngAfterViewInit(): void {
    if (this.data.url) {
      this.generateQRCode(this.data.url);
    }
  }

  generateQRCode(url: string): void {
    QRCode.toCanvas(this.qrcodeCanvas.nativeElement, url, (error: Error | null) => {
      if (error) {
        console.error(error);
      } else {
        console.log('QR Code gerado com sucesso!');
      }
    });
  }

  downloadQRCode(): void {
    const canvas = this.qrcodeCanvas.nativeElement;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qrcode.png'; // TO-DO - dar nome especifico p imagem
    link.click();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

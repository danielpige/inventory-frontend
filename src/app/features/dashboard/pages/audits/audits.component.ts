import { Component, OnInit } from '@angular/core';
import { AuditsService } from './service/audits.service';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';
import { Audit } from '../../../../core/models/audit.model';

@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrl: './audits.component.scss',
})
export class AuditsComponent implements OnInit {
  currentUser!: User | null;
  audits: Audit[] = [];
  loading = false;
  displayedColumns = ['id', 'action', 'entity', 'createdAt'];

  constructor(private auditSvc: AuditsService, private authSvc: AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getAudits(id: string): void {
    this.loading = true;
    this.auditSvc.getProductsById(id as string).subscribe({
      next: (data) => {
        this.audits = [...data];
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
    });
  }

  getUser(): void {
    this.authSvc.user$.subscribe({
      next: (user) => {
        this.currentUser = user;
        this.getAudits(this.currentUser?.id as string);
      },
    });
  }
}

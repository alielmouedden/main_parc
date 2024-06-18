import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Role {
  id: number;
  designation: string;
  description: string;
}

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss'],
})
export class ListRoleComponent implements OnInit {
  @ViewChild('dialogAjoutModification')
  dialogAjoutModification: TemplateRef<any>;
  @ViewChild('dialogSuppression') dialogSuppression: TemplateRef<any>;

  displayedColumns: string[] = ['id', 'designation', 'description', 'actions'];
  roles: Role[] = [
    {
      id: 1,
      designation: 'Agent',
      description: 'Description 1',
    },
    {
      id: 2,
      designation: 'Admin',
      description: 'Description 2',
    },
    {
      id: 2,
      designation: 'Chef du Parc',
      description: 'Description 3',
    },
    {
      id: 2,
      designation: 'Chef de Département',
      description: 'Description 4',
    },
  ];

  selectedRole: Role;
  isEdit: boolean = false;
  roleForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      id: [''],
      designation: [''],
      description: [''],
    });
  }

  ngOnInit(): void {}

  ouvrirDialogAjout(): void {
    this.isEdit = false;
    this.roleForm.reset();
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  ouvrirDialogModification(role: Role): void {
    this.isEdit = true;
    this.selectedRole = role;
    this.roleForm.patchValue(role);
    this.dialog.open(this.dialogAjoutModification, {
      width: '600px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  sauvegarderRole(): void {
    if (this.isEdit) {
      Object.assign(this.selectedRole, this.roleForm.value);
    } else {
      this.roles.push(this.roleForm.value);
    }
    this.dialog.closeAll();
  }

  ouvrirDialogSuppression(role: Role): void {
    this.selectedRole = role;
    this.dialog.open(this.dialogSuppression, {
      width: '400px',
      autoFocus: false,
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  fermerDialog(): void {
    this.dialog.closeAll();
  }

  confirmerSuppression(): void {
    this.roles = this.roles.filter((r) => r !== this.selectedRole);
    this.fermerDialog();
  }
}
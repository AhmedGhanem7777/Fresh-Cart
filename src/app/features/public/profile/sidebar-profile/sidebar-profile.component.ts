import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-profile',
  templateUrl: './sidebar-profile.component.html',
  styleUrl: './sidebar-profile.component.scss'
})
export class SidebarProfileComponent {
  isSidebarVisible: boolean = false; // Boolean to track the visibility of the sidebar

  // Method to toggle the sidebar visibility
  toggleSidebar() {
    // Toggle the boolean value to show/hide the sidebar
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}

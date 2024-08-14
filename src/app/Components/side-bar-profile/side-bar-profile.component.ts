import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar-profile',
  templateUrl: './side-bar-profile.component.html',
  styleUrls: ['./side-bar-profile.component.css']
})
export class SideBarProfileComponent {
  isSidebarVisible: boolean = false; // Boolean to track the visibility of the sidebar

  // Method to toggle the sidebar visibility
  toggleSidebar() {
    // Toggle the boolean value to show/hide the sidebar
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}

import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'theme-toggle',
  styleUrl: 'theme-toggle.css',
  shadow: true,
})
export class ThemeToggle {
  @State() theme: 'light' | 'dark' = 'light';

  componentWillLoad() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      this.theme = savedTheme;
      document.documentElement.setAttribute('data-theme', this.theme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.theme = 'dark';
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }

  render() {
    return (
      <button onClick={() => this.toggleTheme()} class="toggle-btn">
        {this.theme === 'light' ? 'Dark' : 'Light'}
      </button>
    );
  }
}

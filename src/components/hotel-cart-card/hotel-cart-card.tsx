import { Component, Prop, h, getAssetPath, State, Event, EventEmitter, Element } from '@stencil/core';
import flatpickr from 'flatpickr';
import type { Instance as FPInstance } from 'flatpickr/dist/types/instance';
import { RoomData } from '../../utils/data';

@Component({
  tag: 'hotel-cart-card',
  styleUrl: 'hotel-cart-card.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class HotelCartCard {
  @Element() el: HTMLElement;

  @Prop() item: RoomData;
  @Prop() isGrouped: boolean = false;

  @State() isEditing: boolean = false;
  @State() draft: RoomData;

  @Event() itemUpdated: EventEmitter<RoomData>;

  private checkInInput!: HTMLInputElement;
  private checkOutInput!: HTMLInputElement;
  private checkInFp?: FPInstance;
  private checkOutFp?: FPInstance;

  disconnectedCallback() {
    this.destroyPickers();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.draft = { ...this.item };
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => this.initPickers(), 50);
    } else {
      this.destroyPickers();
    }
  }

  saveEdit() {
    if (this.draft) this.itemUpdated.emit(this.draft);
    this.isEditing = false;
    this.destroyPickers();
  }

  destroyPickers() {
    if (this.checkInFp) {
      this.checkInFp.destroy();
      this.checkInFp = undefined;
    }
    if (this.checkOutFp) {
      this.checkOutFp.destroy();
      this.checkOutFp = undefined;
    }
  }

  initPickers() {
    if (this.checkInInput && !this.checkInFp) {
      this.checkInFp = flatpickr(this.checkInInput, {
        defaultDate: this.draft.checkIn,
        dateFormat: 'Y-m-d',
        minDate: 'today',
        onChange: d => d[0] && this.setDate('checkIn', d[0].toISOString().slice(0, 10)),
      });
    }

    if (this.checkOutInput && !this.checkOutFp) {
      this.checkOutFp = flatpickr(this.checkOutInput, {
        defaultDate: this.draft.checkOut,
        dateFormat: 'Y-m-d',
        minDate: 'today',
        onChange: d => d[0] && this.setDate('checkOut', d[0].toISOString().slice(0, 10)),
      });
    }
  }

  calculateNights(a: string, b: string) {
    if (!a || !b) return 0;
    return Math.max(0, Math.ceil((+new Date(b) - +new Date(a)) / 86400000));
  }

  formatDate(s: string) {
    return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
  }

  setDate(field: 'checkIn' | 'checkOut', value: string) {
    this.draft = { ...this.draft, [field]: value };
  }

  changeAdults(delta: number) {
    this.draft = { ...this.draft, adults: Math.max(1, this.draft.adults + delta) };
  }

  render() {
    const data = this.isEditing ? this.draft : this.item;
    if (!data) return null;

    return (
      <div class={{ 'hotel-card': true, 'is-grouped': this.isGrouped }}>
        <div class="card-main">
          {!this.isGrouped && <img src={data.imageUrl} class="hotel-img" />}

          <div class="hotel-info">
            <div class="top-row">
              <div>
                {!this.isGrouped && <h3>{data.hotelName}</h3>}
                <p class="subtitle">{data.roomType}</p>

                <div class="tags">
                  <app-button variant="tertiary">
                    <img src={getAssetPath('./assets/person.svg')} />
                    {data.adults}
                  </app-button>

                  <app-button variant="tertiary">
                    <img src={getAssetPath('./assets/night.svg')} />
                    {this.calculateNights(data.checkIn, data.checkOut)}
                  </app-button>
                </div>
              </div>

              <div class="price">
                ${data.price}
                <span>PER NIGHT</span>
              </div>
            </div>

            <div class="bottom-row">
              <div class="date-row">
                <app-button variant="tertiary">
                  <img src={getAssetPath('./assets/calendar.svg')} />
                  {this.formatDate(data.checkIn)} – {this.formatDate(data.checkOut)}
                </app-button>
              </div>

              <div class="actions">
                <app-button variant={this.isEditing ? 'primary' : 'edit'} square onClick={() => (this.isEditing ? this.saveEdit() : this.toggleEdit())}>
                  {this.isEditing ? <img class="save-icon" src={getAssetPath('assets/tick-circle.svg')} /> : <img src={getAssetPath('assets/edit.svg')} />}
                </app-button>

                <app-button variant="delete" square>
                  <img src={getAssetPath('assets/delete.svg')} />
                </app-button>
              </div>
            </div>
          </div>
        </div>

        {this.isEditing && (
          <div class="edit-section">
            <div class="section">
              <h3>
                <img src={getAssetPath('assets/calendar.svg')} />
                Travel Dates
              </h3>

              <div class="date-inputs">
                <div class="date-input-group">
                  <label>CHECK-IN</label>
                  <div class="input-wrapper">
                    <img src={getAssetPath('assets/calendar-mini.svg')} />
                    <span>{this.formatDate(this.draft.checkIn)}</span>
                    <input ref={el => (this.checkInInput = el as HTMLInputElement)} />
                  </div>
                </div>

                <div class="arrow">→</div>

                <div class="date-input-group">
                  <label>CHECK-OUT</label>
                  <div class="input-wrapper">
                    <img src={getAssetPath('assets/calendar-mini.svg')} />
                    <span>{this.formatDate(this.draft.checkOut)}</span>
                    <input ref={el => (this.checkOutInput = el as HTMLInputElement)} />
                  </div>
                </div>
              </div>
            </div>

            <div class="section">
              <h3>
                <img src={getAssetPath('assets/group.svg')} />
                Guests
              </h3>
              <div class="guest-counter">
                <button onClick={() => this.changeAdults(-1)}>−</button>
                <span>{this.draft.adults}</span>
                <button onClick={() => this.changeAdults(1)}>+</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

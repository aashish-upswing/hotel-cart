import { Component, Prop, h, getAssetPath, State, Event, EventEmitter, Element, Host } from '@stencil/core';
import flatpickr from 'flatpickr';
import type { Instance as FPInstance } from 'flatpickr/dist/types/instance';
import { RoomData } from '../../utils/data';

/**
 * Hotel Cart Card Component
 *
 * Displays a summary of a selected hotel room in the cart.
 * allow editing dates, guests, and removing the item.
 */
@Component({
  tag: 'hotel-cart-card',
  styleUrl: 'hotel-cart-card.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class HotelCartCard {
  @Element() el: HTMLElement;

  /**
   * The hotel room data to display.
   */
  @Prop() item: RoomData;

  /**
   * Whether the card is part of a group (e.g. multiple rooms in same hotel).
   * If true, header info is hidden.
   */
  @Prop() isGrouped: boolean = false;

  @State() isEditing: boolean = false;
  @State() showDeletePopover: boolean = false;
  @State() draft: RoomData;

  /**
   * Emitted when the item details are updated (check-in, check-out, adults).
   */
  @Event() itemUpdated: EventEmitter<RoomData>;

  /**
   * Emitted when the delete action is confirmed.
   */
  @Event() itemDeleted: EventEmitter<string>;

  private checkInInput!: HTMLInputElement;
  private checkOutInput!: HTMLInputElement;
  private checkInFp?: FPInstance;
  private checkOutFp?: FPInstance;

  connectedCallback() {
    document.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('hotel-cart:close-popovers', this.handleGlobalClose);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('hotel-cart:close-popovers', this.handleGlobalClose);
    this.destroyPickers();
  }

  /**
   * Toggles the edit mode state.
   * Initializes date pickers when entering edit mode.
   */
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.draft = { ...this.item };
      // Small delay to ensure input elements are rendered
      setTimeout(() => this.initPickers(), 50);
    } else {
      this.destroyPickers();
    }
  }

  /**
   * Saves the changes made in edit mode and emits the update event.
   */
  saveEdit() {
    if (this.draft) this.itemUpdated.emit(this.draft);
    this.isEditing = false;
    this.destroyPickers();
  }

  handleOutsideClick = (e: MouseEvent) => {
    if (!this.showDeletePopover) return;
    if (!this.el.contains(e.target as Node)) {
      this.showDeletePopover = false;
    }
  };

  handleDelete(e: MouseEvent) {
    e.stopPropagation();
    if (!this.item?.id) return;

    if (!this.showDeletePopover) {
      document.dispatchEvent(new CustomEvent('hotel-cart:close-popovers'));
    }

    this.showDeletePopover = !this.showDeletePopover;
  }

  handleGlobalClose = () => {
    this.showDeletePopover = false;
  };

  confirmDelete() {
    this.itemDeleted.emit(this.item.id);
    this.showDeletePopover = false;
  }

  cancelDelete() {
    this.showDeletePopover = false;
  }

  private destroyPickers() {
    if (this.checkInFp) {
      this.checkInFp.destroy();
      this.checkInFp = undefined;
    }
    if (this.checkOutFp) {
      this.checkOutFp.destroy();
      this.checkOutFp = undefined;
    }
  }

  private initPickers() {
    if (this.checkInInput && !this.checkInFp) {
      this.checkInFp = flatpickr(this.checkInInput, {
        defaultDate: this.draft.checkIn,
        dateFormat: 'Y-m-d',
        minDate: 'today',
        onChange: (selectedDates, dateStr) => {
          this.setDate('checkIn', dateStr);

          // Update minDate of checkout picker
          if (this.checkOutFp) {
            this.checkOutFp.set('minDate', dateStr);

            // Ensure checkout is after checkin
            if (dateStr >= this.draft.checkOut) {
              const checkInDate = selectedDates[0];
              const nextDay = new Date(checkInDate);
              nextDay.setDate(checkInDate.getDate() + 1);

              const nextDayStr = this.checkOutFp.formatDate(nextDay, 'Y-m-d');

              this.checkOutFp.setDate(nextDayStr);
              this.setDate('checkOut', nextDayStr);
            }
          }
        },
      });
    }

    if (this.checkOutInput && !this.checkOutFp) {
      this.checkOutFp = flatpickr(this.checkOutInput, {
        defaultDate: this.draft.checkOut,
        dateFormat: 'Y-m-d',
        minDate: this.draft.checkIn,
        onChange: (_, dateStr) => this.setDate('checkOut', dateStr),
      });
    }
  }

  private calculateNights(a: string, b: string) {
    if (!a || !b) return 0;
    return Math.max(0, Math.ceil((+new Date(b) - +new Date(a)) / 86400000));
  }

  private formatDate(s: string) {
    return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
  }

  private setDate(field: 'checkIn' | 'checkOut', value: string) {
    this.draft = { ...this.draft, [field]: value };
  }

  private changeAdults(delta: number) {
    this.draft = { ...this.draft, adults: Math.max(1, this.draft.adults + delta) };
  }

  render() {
    const data = this.isEditing ? this.draft : this.item;
    if (!data) return null;

    return (
      <Host class={{ 'has-open-popover': this.showDeletePopover }}>
        <div class={{ 'hotel-card': true, 'is-grouped': this.isGrouped }}>
          <div class="card-main">
            {!this.isGrouped && <img src={data.imageUrl} class="hotel-img" alt={data.hotelName} />}

            <div class="hotel-info">
              <div class="top-row">
                <div>
                  {!this.isGrouped && <h3>{data.hotelName}</h3>}
                  <p class="subtitle">{data.roomType}</p>

                  <div class="tags">
                    <app-button variant="tertiary" label="">
                      <img src={getAssetPath('./assets/person.svg')} alt="Guests" />
                      {data.adults}
                    </app-button>

                    <app-button variant="tertiary" label="">
                      <img src={getAssetPath('./assets/night.svg')} alt="Nights" />
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
                  <app-button variant="tertiary" label="">
                    <img src={getAssetPath('./assets/calendar.svg')} alt="Calendar" />
                    {this.formatDate(data.checkIn)} – {this.formatDate(data.checkOut)}
                  </app-button>
                </div>

                <div class="actions">
                  <app-button variant={this.isEditing ? 'primary' : 'edit'} square label="" onClick={() => (this.isEditing ? this.saveEdit() : this.toggleEdit())}>
                    {this.isEditing ? <img class="save-icon" src={getAssetPath('assets/tick-circle.svg')} alt="Save" /> : <img src={getAssetPath('assets/edit.svg')} alt="Edit" />}
                  </app-button>

                  <div class="delete-wrapper">
                    <app-button variant="delete" square label="" onClick={e => this.handleDelete(e)}>
                      <img src={getAssetPath('assets/delete.svg')} alt="Delete" />
                    </app-button>

                    {this.showDeletePopover && (
                      <div class="delete-popover" onClick={e => e.stopPropagation()}>
                        <p>
                          Are you sure you want to delete <strong>{data.roomType}</strong>?
                        </p>
                        <div class="popover-actions">
                          <button class="cancel-btn" onClick={() => this.cancelDelete()}>
                            Cancel
                          </button>
                          <button class="confirm-btn" onClick={() => this.confirmDelete()}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.isEditing && (
            <div class="edit-section">
              <div class="section">
                <h3>
                  <img src={getAssetPath('assets/calendar.svg')} alt="Calendar" />
                  Travel Dates
                </h3>

                <div class="date-inputs">
                  <div class="date-input-group">
                    <label>CHECK-IN</label>
                    <div class="input-wrapper">
                      <img src={getAssetPath('assets/calendar-mini.svg')} alt="Calendar" />
                      <span>{this.formatDate(this.draft.checkIn)}</span>
                      <input ref={el => (this.checkInInput = el as HTMLInputElement)} />
                    </div>
                  </div>
                  <div class="arrow">→</div>
                  <div class="date-input-group">
                    <label>CHECK-OUT</label>
                    <div class="input-wrapper">
                      <img src={getAssetPath('assets/calendar-mini.svg')} alt="Calendar" />
                      <span>{this.formatDate(this.draft.checkOut)}</span>
                      <input ref={el => (this.checkOutInput = el as HTMLInputElement)} />
                    </div>
                  </div>
                </div>
              </div>

              <div class="section">
                <h3>
                  <img src={getAssetPath('assets/group.svg')} alt="Guests" />
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
      </Host>
    );
  }
}

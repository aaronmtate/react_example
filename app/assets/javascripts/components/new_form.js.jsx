var NewForm = createReactClass({
  propTypes: {
    name: PropTypes.string,
    event_date: PropTypes.string,
    place: PropTypes.string,
    description: PropTypes.string,
  },

  getInitialState: function() {
    return {
      name: '',
      place: '',
      event_date: '',
      description: ''
    }
  },

  handleAdd: function(e) {
    e.preventDefault();
    var self = this;
    if (this.validForm()) {
      $.ajax({
        url: '/api/events',
        method: 'POST',
        data: { event: self.state },
        success: function(data) {
          self.props.handleAdd(data);
          self.setState(self.getInitialState());
        },
        error: function(xhr, status, error) {
          alert('Cannot add a new record: ', status, xhr, error);
        }
      })
    } else {
      alert('Please fill all fields.');
    }
  },

  validForm: function() {
    if (this.state.name && this.state.event_date && this.state.place && this.state.description) {
      return true;
    } else {
      return false;
    };
  },

  handleChange: function(e) {
    var input_name = e.target.name;
    var value = e.target.value;
    this.setState({ [input_name] : value });
  },

  render: function() {
    var event = this.props.event;
    return(
      <form className='form-inline' onSubmit={this.handleAdd}>
        <div className='form-group'>
          <input type='text' className='form-control' name='name' placeholder='Name' ref='name' value={this.state.name} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <input type='text' className='form-control' name='place' placeholder='Place' ref='place' value={this.state.place} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <input type='text' className='form-control' name='event_date' placeholder='Event Date' ref='event_date' value={this.state.event_date} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <input type='text' className='form-control' name='description' placeholder='description' ref='description' value={this.state.description} onChange={this.handleChange} />
        </div>
        <button type='submit' className='btn btn-primary'>Add</button>
      </form>
    )
  }
});

import React, { Component } from 'react';
import { Button, Header, Image, Modal, Icon, Form } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';

class ContactDialogue extends Component {
  state = {
    fields: {
      name: '',
      email: '',
      message: '',
    },
    fieldErrors: {},
    notSent: true,
  };

  onFormSubmit = (evt) => {
    const person = this.state.fields;
    const fieldErrors = this.validate(person);
    this.setState({ fieldErrors });
    evt.preventDefault();

    if (Object.keys(fieldErrors).length) return;

    this.setState({
      fields: {
        name: '',
        email: '',
        message: '',
      },
      notSent: false,
    });

    // window.alert('Success');
  };

  onInputChange = (evt) => {
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  };
  onSuccessClose = (evt) => {
    this.setState({ notSent: true });
  };
  validate = (person) => {
    const errors = {};
    if (!person.name) errors.name = 'Name Required';
    if (!person.email) errors.email = 'Email Required';
    if (!person.message) errors.message = 'You can`t send us nothing :)';
    if (person.email && !isEmail(person.email)) errors.email = 'Invalid Email';
    return errors;
  };
  render() {
    if (this.state.notSent) {
      return (
        <Modal
          centered
          trigger={
            <Button basic color='blue'>
              Contact us
            </Button>
          }
          closeIcon
        >
          <Modal.Header>Send us a Message</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  name='name'
                  label='Your Name'
                  placeholder='Your Name'
                  onChange={this.onInputChange}
                  required
                />
                <span style={{ color: 'red' }}>
                  {this.state.fieldErrors.name}
                </span>
                <Form.Input
                  fluid
                  name='email'
                  label='Email'
                  placeholder='Email'
                  required
                  onChange={this.onInputChange}
                />
                <span style={{ color: 'red' }}>
                  {this.state.fieldErrors.email}
                </span>
              </Form.Group>

              <Form.TextArea
                required
                name='message'
                label='Message'
                placeholder='What you want to tell us ?'
                onChange={this.onInputChange}
              />
              <span style={{ color: 'red' }}>
                {this.state.fieldErrors.message}
              </span>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.onFormSubmit}>
              <Icon name='send  ' /> Submit
            </Button>
          </Modal.Actions>
        </Modal>
      );
    } else
      return (
        <Modal onUnmount={this.onSuccessClose} closeIcon>
          <Modal.Header>Thank You !</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size='medium'
              src='https://thumbs.dreamstime.com/b/message-sent-notification-vector-icon-wbsite-design-element-120000357.jpg'
            />
            <Modal.Description>
              <Header>Your message has been sent to us!</Header>
              <p>We are glad to hear opinions from you</p>
              <p>Our customer support specialist will contact you asap</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      );
  }
}

export default ContactDialogue;

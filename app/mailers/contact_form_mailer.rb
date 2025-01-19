class ContactFormMailer < ApplicationMailer
  default from: 'info@wiseaustria.com'

  def contact_email(name, message)
    @name = name
    @message = message

    mail(to: 'info@wiseaustria.com', subject: "New Message from #{name}!")
  end
end
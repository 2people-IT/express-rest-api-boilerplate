import nodemailer from 'nodemailer'
import ejs from 'ejs'
import path from 'path'
import { mail } from '../../config'

const transport = nodemailer.createTransport({
  host: mail.host,
  port: mail.port,
  auth: {
    user: mail.login,
    pass: mail.password
  }
})

export const sendMail = async ({ toEmail, subject, htmlBody }) => {
  const message = {
    from: mail.from, // Sender address
    to: toEmail, // List of recipients
    subject, // Subject line
    html: htmlBody
  }

  try {
    const info = await transport.sendMail(message)
    console.log('mail info', info)
  } catch (err) {
    console.error('mail error', err)
  }
}

export const renderHtml = async (templateName, data) => {
  return ejs.renderFile(path.join(mail.templatesPath, `${templateName}.ejs`), { ...data })
}

export const sendPassword = async ({ to, password }) => {
  const html = await renderHtml('password', { password })

  return sendMail({
    toEmail: to,
    subject: 'New password for Exprees Rest API Boilerplate!',
    htmlBody: html
  })
}

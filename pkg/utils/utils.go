package utils

import (
	"net/smtp"
)

func SendMail(body []byte) error {
	auth := smtp.PlainAuth("", "ykosiner@gmail.com", "xhxm yyet pbwh qbwy", "smtp.gmail.com")
	to := []string{"ykosiner@gmail.com"}
	err := smtp.SendMail("smtp.gmail.com:587", auth, "ykosiner@gmail.com", to, body)

	return err
}

package messages

type Message struct {
	ApplicationToken string `json:"applicationToken"`
	ChatNumber       int    `json:"chatNumber"`
	Number           int    `json:"number"`
	Content          string `json:"content"`
}

func NewMessage(applicationToken string, chatNumber int, messageNumber int, content string) Message {
	return Message{
		ApplicationToken: applicationToken,
		ChatNumber:       chatNumber,
		Number:           messageNumber,
		Content:          content,
	}
}

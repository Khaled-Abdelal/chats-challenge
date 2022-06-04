package chat

type Chat struct {
	ApplicationToken string `json:"applicationToken"`
	Number           int    `json:"number"`
}

func NewChat(applicationToken string, chatNumber int) Chat {
	return Chat{
		ApplicationToken: applicationToken,
		Number:           chatNumber,
	}
}

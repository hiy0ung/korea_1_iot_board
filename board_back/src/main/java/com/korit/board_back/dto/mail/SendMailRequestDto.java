package com.korit.board_back.dto.mail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SendMailRequestDto {
    private String email;
    private String username; // token에 보관할 것
}

package board.dto;

import lombok.Data;

@Data
public class LoginDto {
	private String memberId;
	private String memberName;
	private String memberPassword;
}
package board.dto;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Data;

@DynamicInsert 
@DynamicUpdate 
@Data
public class BoardDto {
    private int boardIdx;
    private String title;
    private String contents;
    private int hitCnt;
    private String creatorId;
    
	private String createdDatetime;
    private String updaterId;
    private String updatedDatetime;
}
package board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import board.dto.BoardDto;
import board.service.BoardService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ReactController {
	@Autowired
	private BoardService boardService;

	// get all board 
	@GetMapping("/board")
	public List<BoardDto> getAllBoards() throws Exception {
		
		return boardService.selectBoardList();
	}
}

package board.controller;

import java.io.File;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import board.dto.BoardDto;
import board.dto.BoardFileDto;
import board.dto.MemberDto;
import board.service.BoardService;

@Controller //①
public class BoardController {
	int glo_studyId;
	
    @Autowired
    private BoardService boardService;  //boardService는 비즈니스로직을 처리하는 서비스 빈을 연결한다. 이는 아래 서비스 영역에서 다시 설명한다.

//    @RequestMapping("/board/openBoardList.do")  //@RequestMapping("/board/openBoardList.do")은 어노테이션의 값으로 주소를 지정한다. 여기서는 웹브라우저에서 /board/openBoardList.do라는 주소를 호출하면 스프링 디스패처는 호출된 주소와 @RequestMapping 어노테이션의 값이 동일한 메서드를 찾아서 실행한다.
//    public ModelAndView openBoardList(int studyId,BoardDto board,HttpSession session) throws Exception{
//        
//    	MemberDto member=(MemberDto) session.getAttribute("loginUser");
//    	
//    	// 로그인 한 사용자
//    	if (member==null) {
//    		System.out.println("로그인 해주세요.");
//    		ModelAndView mv = new ModelAndView("login");
//    		return mv;
//    	}
//    	else {
//    	
//	    	ModelAndView mv = new ModelAndView("/boardList"); //ModelAndView는 호출된 요청의 결과를 보여줄 뷰를 지정한다. 여기서는 /board/boardList로 지정했는데 이는 templates 폴더 아래있는 /board/boardList.html을 의미한다. Thymeleaf와 같은 템플릿을 사용할 경우 스프링 부트의 자동 설정 기능으로 .html과 같은 접미사를 생략할 수 있다.
//	        glo_studyId=studyId;
//	        List<BoardDto> list = boardService.selectBoardList(studyId);   //List<BoardDto> list에서는 게시글 목록을 조회한다. “게시글 목록을 조회한다.”는 비즈니스 로직을 수행하기 위해서 BoardService 클래스의 selectBoardList 메서드를 호출한다. 게시글 목록을 저장하기 위해서 List 인터페이스를 사용했다.
//	        mv.addObject("list", list); //실행된 비즈니스 로직의 결과 값(list)을 뷰에 list라는 이름으로 저장한다.
//	
//	        return mv;
//    	}
//    }
    
    @RequestMapping("/board/openBoardWrite.do")		//게시글 작성화면 호출
    public String openBoardWrite(HttpSession session) throws Exception{
    	
    	// 로그인 한 사용자만 글 등록할 수 있게 
    	MemberDto member=(MemberDto) session.getAttribute("loginUser");
    	
    	if (member==null) {
    		System.out.println("로그인 해주세요.");
    		return "redirect:/board/openBoardList.do?studyId="+glo_studyId;
    	}
    	return "/boardWrite";
    }
    
    @RequestMapping("/board/insertBoard.do")		//작성된 게시글 등록
    public String insertBoard(BoardDto board, MultipartHttpServletRequest multipartHttpServletRequest) throws Exception{
    	board.setStudyId(glo_studyId);
    	boardService.insertBoard(board, multipartHttpServletRequest);
    	return "redirect:/board/openBoardList.do?studyId="+glo_studyId;	//게시글 리스트로 이동
    }
    
//    @RequestMapping("/board/openBoardDetail.do")
//    public ModelAndView openBoardDetail(@RequestParam int boardIdx) throws Exception{		//@RequestParam url에 boardIdx 값 받아옴.
//    	//public ModelAndView openBoardDetail(@RequestParam("boardIdx")Integer boardIdx) throws Exception{		//이것도 가능
//    	ModelAndView mv = new ModelAndView("/boardDetail");		//templates에서 바로 찾음
//    	
//    	// 이미지파일 출력
//    	BoardFileDto boardFile = boardService.selectBoardFileInformation(boardIdx);
//    	BoardDto board = boardService.selectBoardDetail(boardIdx);
//    	mv.addObject("board", board);
//    	mv.addObject("boardFile", boardFile);
//    	
//    	System.out.println("파일 정보 :: "+boardFile);
//    	
//    	return mv;
//    }
    
    @RequestMapping("/board/updateBoard.do")
    public String updateBoard(BoardDto board,HttpSession session) throws Exception{
    	BoardDto boardDetail = boardService.selectBoardDetail(board.getBoardIdx());
    	//System.out.println("게시글 작성자 확인2 :: "+boardDetail.getCreatorId());
    	
    	MemberDto mem = (MemberDto)session.getAttribute("loginUser");

    	//System.out.println("session 확인 :: "+mem.getMemberId());
		
    	// 게시글 작성자와 현재 로그인 한 유저가 같은 경우에만 수정 가능
    	if (String.valueOf(boardDetail.getCreatorId()).equals(String.valueOf(mem.getMemberId()))){
    		boardService.updateBoard(board);
    		System.out.println("수정 완료");
    	}
    	else {
    		System.out.println("수정 불가");
    	}

    	return "redirect:/board/openBoardList.do?studyId="+glo_studyId;
    }
    
    @RequestMapping("/board/deleteBoard.do")
    public String deleteBoard(int boardIdx) throws Exception{
    	System.out.println("delete들어옴");
    	boardService.deleteBoard(boardIdx);
    	return "redirect:/board/openBoardList.do?studyId="+glo_studyId;
    }
    
//    @RequestMapping("/board/downloadBoardFile.do")
//    public void downloadBoardFile(@RequestParam int boardIdx, HttpServletResponse response) throws Exception{
//    	System.out.println("들어옴");
//    	BoardFileDto boardFile = boardService.selectBoardFileInformation(boardIdx);
//    	if(ObjectUtils.isEmpty(boardFile) == false) {
//    		String fileName = boardFile.getOriginalFileName();
//    		
//    		byte[] files = FileUtils.readFileToByteArray(new File(boardFile.getOriginalFilePath()));
//    		
//    		response.setContentType("application/octet-stream");
//    		response.setContentLength(files.length);
//    		response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(fileName, "UTF-8")+"\";");
//    		response.setHeader("Content-Transfer-Encoding", "binary");
//    		
//    		response.getOutputStream().write(files);
//    		response.getOutputStream().flush();
//    		response.getOutputStream().close();
//    	}
//    }
}

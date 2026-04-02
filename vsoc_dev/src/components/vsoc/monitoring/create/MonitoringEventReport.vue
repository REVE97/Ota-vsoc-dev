<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>모니터링 리포트</span>
      <span>리포트 신규 작성</span>
    </section>
    <section class="step">
      <ul>
        <li class="active">
          <strong>Event Report</strong>
        </li>
      </ul>
    </section>
    <section class="page write">
      <article class="table">
        <p class="guide">
          * 표시는 필수 입력 항목입니다.
        </p>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th class="required">제품명</th>
              <td class="input">
                <input type="text" placeholder="제품명을 입력해주세요" v-model="postData.data.productName"/>
              </td>
              <th class="required">프로젝트명</th>
              <td class="input">
                <input type="text" placeholder="프로젝트명을 입력해주세요" v-model="postData.data.projectName"/>
              </td>
            </tr>
            <tr>
              <th class="required">연관된 Asset</th>
              <td class="input">
                <input type="text" placeholder="Asset 이름을 입력해주세요" v-model="postData.data.associatedAsset"/>
              </td>
              <th class="required">CS Info 이름</th>
              <td class="input">
                <input type="text" placeholder="CS Information title을 입력해주세요" v-model="postData.data.csInfoName"/>
              </td>
            </tr>
            <tr>
              <th class="required">Description</th>
              <td colspan="3" class="input">
                <input type="text" placeholder="이벤트에 대한 설명을 입력해주세요" v-model="postData.data.description"/>
              </td>
            </tr>
            <tr>
              <th class="required">심각도/CVSS 점수
                <div class="tooltip">
                  <i></i>
                  <p>1 ~ 10사이 숫자만 입력해주세요.</p>
                </div>
              </th>
              <td class="input">
                <input 
                  type="text" 
                  placeholder="심각도 또는 CVSS 점수 입력 (1 ~ 10 사이 값)" 
                  v-model="postData.data.severityScore"
                  @input="onlyNumber($event, postData.data, 'severityScore')" />
              </td>
              <th class="required">수집된 URL</th>
              <td class="input">
                <input type="text" placeholder="수집된 URL을 입력해주세요" v-model="postData.data.collectionUrl"/>
              </td>
            </tr>
            <tr>
              <th class="required">보고자</th>
              <td class="input">
                <input type="text" placeholder="이벤트 최초 보고자의 이름을 입력해주세요" v-model="postData.data.reporter"/>
              </td>
              <th class="required">담당자</th>
              <td class="input">
                <input type="text" placeholder="담당자 이름을 입력해주세요" v-model="postData.data.manager"/>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <button @click="openCancelConfirm" class="cancel">취소</button>
        <button @click="postfetch_event" :disabled="!isAllInput">완료</button>
      </article>

      <!-- modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppStore } from '@/store/app';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';

const store = useAppStore();
const router = useRouter();
const route = useRoute();

// 새로운 이벤트 리포트 작성 데이터 상태값
const postData = ref({
  reportType: "event",
  data: {
    productName: "",
    projectName: "",
    associatedAsset: "",
    csInfoName: "",
    description: "",
    severityScore: null,
    collectionUrl: "",
    reporter: "",
    manager: "",
    matchedId: route.params.matchedId,
    keyword: route.params.keyword,
  }
})

// 사용자가 필수 요소를 모두 입력해야 버튼 활성화
const isAllInput = computed(() => {
  return Object.values(postData.value.data).every(
    (value) => value !== null && value !== undefined && value !== ""
  );
});

// 숫자만 입력하게
const onlyNumber = (e, target, key) => {
  target[key] = e.target.value.replace(/[^0-9]/g, "");
}

// 새로운 이벤트 리포트 작성 POST 호출
const postfetch_event = async() => {
  try {
    const res = await axios.post('/api/vsoc/monitoring-report',postData.value);
    if(res.data.resultCode === -1) {
      alert('데이터 전송 실패')
    } else {
      openSaveDone();
    }
  } catch (error) {
    console.error(error);
    alert('데이터 전송 실패');
  }
}

// Modal
const goList = () => router.push({name: "monitoring_management" });

const openSaveDone = () => {
  store.setModalInfo({
    on: true,
    type: "onebtn",
    iconClass: "success",
    textArea: "Event Report가 등록되었습니다.",
    btnText: "확인",

    rightBtn: () => { goList(); },
  })
};

const openCancelConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "success",
    textArea: "아직 등록되지 않은 내용이 있습니다. 페이지를 나가면 작성하신 내용이 모두 사라집니다.",

    rightBtn: () => { goList(); },
  })
};

</script>

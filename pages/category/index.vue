<template>
	<view>
		<!-- 搜索 -->
		<search />
		<!-- 分类 -->
		<view class="category">
			<!-- 顶级分类 -->
			<view class="sup">
				<scroll-view scroll-y>
					<text
						@click="active(index)"
						:class="{ active: index === activeIndex }"
						v-for="(item, index) in CateGoyList"
						:key="item.cat_id"
					>
						{{ item.cat_name }}
					</text>
				</scroll-view>
			</view>
			<!-- 子级分类 -->
			<view class="sub">
				<scroll-view scroll-y>
					<!-- 封面图 -->
					<image src="http://static.botue.com/ugo/uploads/category.png" class="thumb"></image>
					<view class="children" v-for="item in subCategoyrList" :key="item.cat_id">
						<view class="title">{{item.cat_name}}</view>
						<!-- 品牌 -->
						<view class="brands" v-for="brand in item.children" :key="brand.cat_id">
							<navigator :url="`/subpkg/pages/list/index?query={brand.cat_name}`">
								<image :src="brand.cat_icon"></image>
								<text>{{brand.cat_name}}</text>
							</navigator>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import search from '@/components/search';

export default {
	components: {
		search
	},

	data() {
		return {
			CateGoyList: [],
			activeIndex: 0
		};
	},

	computed: {
		subCategoyrList() {
			if (this.CateGoyList[this.activeIndex]) {
				return this.CateGoyList[this.activeIndex].children;
			}
			return [];
		}
	},

	onLoad() {
		this.getCateGoyList();
	},

	methods: {
		async getCateGoyList() {
			const { data: res } = await uni.$http.get('/api/public/v1/categories');
			console.log(res);
			if (res.meta.status !== 200) {
				return uni.showToast({
					title: '加载失败',
					icon: 'none'
				});
			}
			// 更新数据
			this.CateGoyList = res.message;
		},
		// 更改index
		// 在 data 里面定义一个变量, 创建点击事件,
		active(index) {
			this.activeIndex = index;
		}
	}
};
</script>

<style scoped lang="scss">
scroll-view {
	height: 100%;
}

.category {
	display: flex;
	width: 100%;
	position: absolute;
	top: 100rpx;
	bottom: 0;

	.sup {
		width: 196rpx;
		background-color: #f4f4f4;

		text {
			display: block;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			font-size: 27rpx;
			color: #333;
			border-bottom: 1rpx solid #eee;

			&:last-child {
				border-bottom: none;
			}

			&.active {
				background-color: #fff;
				color: #ea4451;
				position: relative;

				&::before {
					content: '';
					display: block;
					width: 8rpx;
					height: 60rpx;
					transform: translateY(-50%);
					background-color: #ea4451;

					position: absolute;
					left: 0;
					top: 50%;
				}
			}
		}
	}

	.sub {
		flex: 1;
		padding: 20rpx 18rpx;

		.thumb {
			width: 100%;
			height: 180rpx;
		}

		.children {
			text-align: center;
			color: #333;

			.title {
				display: inline-block;
				margin: 40rpx 0 20rpx;
				font-size: 30rpx;

				&::before {
					content: '/';
					margin-right: 20rpx;
					color: #666;
				}

				&::after {
					content: '/';
					margin-left: 20rpx;
					color: #666;
				}
			}
		}

		.brands {
			display: flex;
			flex-wrap: wrap;

			navigator {
				width: 33%;
				margin-bottom: 20rpx;
			}

			image {
				width: 120rpx;
				height: 120rpx;
			}

			text {
				display: block;
				font-size: 24rpx;
			}
		}
	}
}
</style>
